import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbconnect'; 
import User from '@/model/user/user_model'; 
import { generateToken } from '@/lib/auth'; 
import { setTokenCookie } from '@/lib/cookies'; // Import the setTokenCookie function
import { NextResponse } from 'next/server'; // Import NextResponse for server responses

export async function POST(req) {
    try {
        await dbConnect();

        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Invalid Credentials")
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            console.log("Invalid Credentials")
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = generateToken(user);

        const response = NextResponse.json(
            { 
                message: 'Login successful',
                role: user.role,  // Send back the role
            },
            { status: 200 }
        );
        setTokenCookie(response, user);
        console.log("Response recieved from the login api, src/app/api/auth/login/" , response) ;
        return response;
    } catch (error) {
        console.log("Error recieved from the login api, src/app/api/auth/login/" , error) ;
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message },
            { status: 500 }
        );
    }
}
