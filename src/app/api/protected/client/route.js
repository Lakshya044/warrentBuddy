import { authenticate, checkRole } from '@/middleware/authMiddleware';
import { NextResponse } from 'next/server';

const handler = async (req) => {
    // Your logic for the Client route
    return NextResponse.json({ message: 'Client access granted', user: req.user });
};

export const GET = authenticate(checkRole(4)(handler)); // Only accessible by users with role 4 (Client)
