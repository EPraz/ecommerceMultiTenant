import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SetupService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    // 1. Asegurar roles del enum en la base de datos
    const defaultRoles = Object.values(Role);
    for (const name of defaultRoles) {
      await this.prisma.roleEntity.upsert({
        where: { name },
        update: {},
        create: { name },
      });
    }

    console.log('[SetupService] Roles asegurados');

    // 2. Crear super admin si no existe
    const superAdminEmail = 'admin@ecommerce.com';

    const existingAdmin = await this.prisma.user.findUnique({
      where: { email: superAdminEmail },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('mamamiaadmin', 10);

      const newAdmin = await this.prisma.user.create({
        data: {
          email: superAdminEmail,
          password: hashedPassword,
        },
      });

      const adminRole = await this.prisma.roleEntity.findUnique({
        where: { name: Role.ADMIN },
      });

      const customerRole = await this.prisma.roleEntity.findUnique({
        where: { name: Role.CUSTOMER },
      });

      await this.prisma.userRole.createMany({
        data: [
          { userId: newAdmin.id, roleId: adminRole!.id },
          { userId: newAdmin.id, roleId: customerRole!.id },
        ],
      });

      console.log(
        `[SetupService] Admin creado: ${superAdminEmail} / mamamiaadmin`,
      );
    } else {
      console.log(`[SetupService] Admin ya existe`);
    }
  }
}
