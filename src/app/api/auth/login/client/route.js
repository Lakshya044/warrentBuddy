import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbconnect';  // Ensure the correct path is used
import { Client } from '@/model/user/userModel';   // Adjust path to your Client model
import { generateToken } from '@/lib/auth'; // Import the generateToken function
import { setTokenCookie } from '@/lib/cookies'; // Import the setTokenCookie function
import { NextResponse } from 'next/server'; // Import NextResponse for server responses

export async function POST(req) {
    try {
        await dbConnect();

        const { email, password } = await req.json(); // Read JSON body from request

        // Find user in the Client collection
        const user = await Client.findOne({ email });
console.log("user",user);
const pass=bcrypt.compareSync(password, user.password);
console.log("pass",pass);
        // Check password and role
        if (!user || !bcrypt.compareSync(password, user.password) ) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set the token as a cookie
        const response = NextResponse.json({ message: 'Login successful' }, { status: 201 });
        setTokenCookie(response, user);

        return response;
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message }, 
            { status: 500 }
        );
    }
}
