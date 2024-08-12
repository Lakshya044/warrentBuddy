import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const authenticate = (handler) => {
    return async (req) => {
        try {
            const token = req.cookies.get('token');

            if (!token) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = {
                id: decoded.userId,
                email: decoded.email,
                role: decoded.role // Ensure this is set correctly
            };

            return handler(req);
        } catch (error) {
            return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 });
        }
    };
};

export const checkRole = (requiredRole) => {
    return (handler) => {
        return async (req) => {
            if (!req.user || req.user.role !== requiredRole) {
                console.log(`Authorization failed: User role is not ${requiredRole}`);
                return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
            }
            return handler(req);
        };
    };
};
