import dbConnect from '@/lib/dbconnect';  // Ensure the correct path is used
import { Judge } from '@/model/user/userModel';   // Adjust path to your Judge model
import { generateToken } from '@/lib/auth'; // Import the generateToken function
import { setTokenCookie } from '@/lib/cookies'; // Import the setTokenCookie function
import { NextResponse } from 'next/server'; // Import NextResponse for server responses

export async function POST(req) {
    try {
        await dbConnect();

        const { judgeId, email } = await req.json(); // Read JSON body from request

        // Find user in the Judges collection
        const user = await Judge.findOne({ judgeId, email });

        if (!user || user.role !== 1) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Set the token as a cookie
        const response = NextResponse.json({ message: 'Login successful' });
        setTokenCookie(response, user);
// console.log("cook",cook);
        return response;
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message }, 
            { status: 500 }
        );
    }
}
