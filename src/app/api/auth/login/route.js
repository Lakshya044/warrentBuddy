import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbconnect'; 
import User from '@/model/user/user_model'; 
import { generateToken } from '@/lib/auth'; 
import { setTokenCookie } from '@/lib/cookies'; // Import the setTokenCookie function
import { NextResponse } from 'next/server'; // Import NextResponse for server responses

export async function POST(req) {
    try {
        // Connect to the database
        await dbConnect();

        // Parse the request body
        const { email, password } = await req.json();

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Validate the password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Generate a JWT token
        const token = generateToken(user);

        // Set the token as a cookie
        const response = NextResponse.json(
            { message: 'Login successful', role: user.role },
            { status: 200 }
        );
        setTokenCookie(response, user);

        return response;
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
