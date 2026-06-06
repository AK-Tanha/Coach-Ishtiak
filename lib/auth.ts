import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'rahmat_sany_secret_2024';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@coachsany.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export interface JwtPayload {
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export function signToken(): string {
  const payload: JwtPayload = { email: ADMIN_EMAIL, role: 'admin' };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export function validateCredentials(email: string, password: string): boolean {
  return email === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }
  const cookie = request.cookies.get('token');
  return cookie?.value || null;
}

export function requireAuth(request: NextRequest): JwtPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  return verifyToken(token);
}
