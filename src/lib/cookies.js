import { NextResponse } from 'next/server';

export const setTokenCookie = (response, token) => {
    response.cookies.set('token', token, { httpOnly: true, maxAge: 3600 });
    return response;
};
