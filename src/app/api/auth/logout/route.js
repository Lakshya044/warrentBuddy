// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear the token cookie
    response.cookies.delete('token');
    response.cookies.delete('email');
    response.cookies.delete('role');
    return response;
}
