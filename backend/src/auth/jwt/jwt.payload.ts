export interface JwtPayload {
  sub: string; // userId
  roles: string[]; // 'ADMIN' | 'VENDOR' | 'CUSTOMER'
  tenantId?: string; // opcional
}
