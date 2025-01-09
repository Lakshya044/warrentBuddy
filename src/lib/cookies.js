import jwt from 'jsonwebtoken';

export const setTokenCookie = (response, user) => {
    const token = jwt.sign(
        { userId: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
console.log(token);
    response.cookies.set('token', token, { httpOnly: true, maxAge: 3600 });
    
    response.cookies.set('name', user.name, { httpOnly: true, maxAge: 3600 });
    
    response.cookies.set('role', user.role, { httpOnly: true, maxAge: 3600 });
    response.cookies.set('email', user.email, { httpOnly: true, maxAge: 3600 });
console.log(response);
    return response;
};
