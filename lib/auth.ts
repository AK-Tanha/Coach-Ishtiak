import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { getSupabaseAdmin } from './supabase-server';

const JWT_SECRET = process.env.JWT_SECRET || 'rahmat_sany_secret_2024';

export interface JwtPayload {
  email: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

export function signToken(): string {
  const payload: JwtPayload = { email: 'admin@coachishtiak.com', role: 'admin' };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload;
  } catch {
    return null;
  }
}

export async function validateCredentials(email: string, password: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  return !error;
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
