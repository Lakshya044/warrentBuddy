import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const setTokenCookie = (response, user) => {
    // Generate a JWT token
    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
console.log(token);
    // Set the token cookie
    response.cookies.set('token', token, { httpOnly: true, maxAge: 3600 });
    
    response.cookies.set('name', user.name, { httpOnly: true, maxAge: 3600 });
    
    // Optionally set role and email separately if needed
    response.cookies.set('role', user.role, { httpOnly: true, maxAge: 3600 });
    response.cookies.set('email', user.email, { httpOnly: true, maxAge: 3600 });
console.log(response);
    return response;
};
