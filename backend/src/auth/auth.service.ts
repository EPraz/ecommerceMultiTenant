import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterCustomerDto, RegisterTenantDto } from './dto';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { handlePrismaError } from 'src/helper';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async registerTenant(request: RegisterTenantDto) {
    try {
      const hashedPassword = await bcrypt.hash(request.password, 10);
      const normalizedEmail = request.email.toLowerCase();

      // Paso 1: Crear el usuario dueño
      const owner = await this.prisma.user.create({
        data: {
          email: normalizedEmail,
          password: hashedPassword,
        },
      });

      // Obtener los roles necesarios
      const vendorRole = await this.prisma.roleEntity.findUnique({
        where: { name: Role.VENDOR },
      });
      const customerRole = await this.prisma.roleEntity.findUnique({
        where: { name: Role.CUSTOMER },
      });

      if (!vendorRole || !customerRole)
        throw new InternalServerErrorException('Roles not found');

      // Asignar roles VENDOR y CUSTOMER al dueño del tenant
      await this.prisma.userRole.createMany({
        data: [
          { userId: owner.id, roleId: vendorRole.id },
          { userId: owner.id, roleId: customerRole.id },
        ],
        skipDuplicates: true,
      });

      // Paso 2: Crear el tenant
      const tenant = await this.prisma.tenant.create({
        data: {
          name: request.tenantName,
          slug: request.tenantSlug,
          ownerId: owner.id,
        },
      });

      // Paso 3: Asociar usuario al tenant
      await this.prisma.user.update({
        where: { id: owner.id },
        data: {
          tenantId: tenant.id,
        },
      });

      return this.generateTokens(
        owner.id,
        [Role.VENDOR, Role.CUSTOMER],
        tenant.id,
      );
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async registerCustomer(request: RegisterCustomerDto) {
    try {
      const hashedPassword = await bcrypt.hash(request.password, 10);
      const normalizedEmail = request.email.toLowerCase();

      const user = await this.prisma.user.create({
        data: {
          email: normalizedEmail,
          password: hashedPassword,
        },
      });

      const customerRole = await this.prisma.roleEntity.findUnique({
        where: { name: Role.CUSTOMER },
      });

      if (!customerRole)
        throw new InternalServerErrorException('Customer role not found');

      await this.prisma.userRole.create({
        data: {
          userId: user.id,
          roleId: customerRole.id,
        },
      });

      return this.generateTokens(user.id, [Role.CUSTOMER]);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async login(request: LoginDto) {
    try {
      const normalizedEmail = request.email.toLowerCase();
      const user = await this.prisma.user.findUnique({
        where: { email: normalizedEmail },
        include: {
          roles: {
            include: { role: true },
          },
        },
      });

      if (!user) throw new UnauthorizedException('Invalid credentials');

      const passwordMatch = await bcrypt.compare(
        request.password,
        user.password,
      );
      if (!passwordMatch)
        throw new UnauthorizedException('Invalid credentials');

      const roles = user.roles.map((r) => r.role.name);

      return this.generateTokens(user.id, roles, user.tenantId);
    } catch (error) {
      handlePrismaError(error);
    }
  }

  async generateTokens(
    userId: string,
    roles: string[],
    tenantId?: string | null,
  ) {
    const payload = { sub: userId, roles, tenantId };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);

      const accessToken = this.jwtService.sign(
        {
          sub: payload.sub,
          roles: payload.roles,
          tenantId: payload.tenantId,
        },
        { expiresIn: '15m' },
      );

      return {
        accessToken,
        user: {
          userId: payload.sub,
          roles: payload.roles,
          tenantId: payload.tenantId ?? null,
        },
      };
    } catch (e) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
