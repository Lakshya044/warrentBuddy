import { authenticate, checkRole } from '@/middleware/authMiddleware';
import { NextResponse } from 'next/server';

const handler = async (req) => {
    // Your logic for the Judge route
    return NextResponse.json({ message: 'Judge access granted', user: req.user });
};

export const GET = authenticate(checkRole(1)(handler)); // Only accessible by users with role 1 (Judge)
