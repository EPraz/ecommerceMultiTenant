import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterTenantDto, RegisterCustomerDto, LoginDto } from './dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register-tenant')
  registerTenant(@Body() request: RegisterTenantDto) {
    return this.authService.registerTenant(request);
  }

  @Post('register-customer')
  registerCustomer(@Body() request: RegisterCustomerDto) {
    return this.authService.registerCustomer(request);
  }

  @Post('login')
  async login(
    @Body() request: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.login(request);
    res.cookie('jwt', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });
    return { accessToken: tokens.accessToken };
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies['jwt'];
    if (!token) return res.status(401).send('Missing refresh token');

    try {
      const result = await this.authService.refreshToken(token);
      res.json(result);
    } catch {
      res.status(401).send('Invalid refresh token');
    }
  }
}
