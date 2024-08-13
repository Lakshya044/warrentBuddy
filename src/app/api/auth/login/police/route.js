import dbConnect from '@/lib/dbconnect';  // Ensure the correct path is used
import { Police} from '@/model/user/userModel';   // Adjust path to your Police model
import { generateToken } from '@/lib/auth'; // Import the generateToken function
import { setTokenCookie } from '@/lib/cookies'; // Import the setTokenCookie function
import { NextResponse } from 'next/server'; // Import NextResponse for server responses

export async function POST(req) {
    try {
        await dbConnect();

        const { policeId, email } = await req.json(); // Read JSON body from request
console.log(policeId, email);
        // Find user in the Police collection
        const user = await Police.findOne({ policeId, email });
console.log(user.role)
if (!user || user.role !== 2) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }
console.log("user",user);
console.log("user.role",user.role);
console.log("user.email",user.email);
        // Generate JWT token
        const token = generateToken(user);

        // Set the token as a cookie
        const response = NextResponse.json({ message: 'Login successful' });
       const cook= setTokenCookie(response, user);
console.log("cook",cook);
        return response;
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error', error: error.message }, 
            { status: 500 }
        );
    }
}
