import { authenticate, checkRole } from '@/middleware/authMiddleware';
import { NextResponse } from 'next/server';

const handler = async (req) => {
    // Your logic for the Police route
    return NextResponse.json({ message: 'Police access granted', user: req.user });
};

export const GET = authenticate(checkRole(2)(handler)); // Only accessible by users with role 2 (Police)
