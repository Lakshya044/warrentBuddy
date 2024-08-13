import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export const authenticate = (handler) => {
    return async (req) => {
        try {
            const token = req.cookies.get('token');
            console.log("Token from cookies:", token);

            if (!token) {
                return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
            }

            // Verify the token and decode the payload
            const decoded = jwt.verify(token.value, process.env.JWT_SECRET); // Note the .value here
            console.log("Decoded token payload:", decoded);

            req.user = {
                id: decoded.userId,
                email: decoded.email,
                role: decoded.role
            };

            return handler(req);
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 });
        }
    };
};

export const checkRole = (requiredRole) => {
    return (handler) => {
        return async (req) => {
            console.log(`User role: ${req.user.role}, Required role: ${requiredRole}`);
            
            if (!req.user || req.user.role !== requiredRole) {
                console.log(`Authorization failed: User role is not ${requiredRole}`);
                return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
            }
            return handler(req);
        };
    };
};

