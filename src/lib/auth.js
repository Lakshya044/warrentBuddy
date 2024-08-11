import jwt from 'jsonwebtoken';

export const generateToken = (user, role) => {
    return jwt.sign(
        { userId: user._id, email: user.email, role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};
