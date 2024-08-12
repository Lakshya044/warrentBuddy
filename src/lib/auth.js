import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign(
        { userId: user.id, email: user.email, role: user.role }, // Ensure role is included
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};


