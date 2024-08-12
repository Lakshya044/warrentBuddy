import { NextResponse } from 'next/server';

export const setTokenCookie = (response, token,role,email) => {
    response.cookies.set('token', token, { httpOnly: true, maxAge: 3600 });
    response.cookies.set('role', role, { httpOnly: true, maxAge: 3600 });
    response.cookies.set('email', email, { httpOnly: true, maxAge: 3600 });
    return response;
};
