
import { NextResponse } from 'next/server';

export async function GET(request) {
  const token = request.cookies.get('token')?.value || null;
  const name = request.cookies.get('name')?.value || null;
  const role = request.cookies.get('role')?.value || null;

  return NextResponse.json({ token, name, role });
}
