import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import User from "@/model/user/user_model";
import { authenticate, checkRole } from '@/middleware/authMiddleware';

// Function to handle unauthorized access
const handleUnauthorized = () => {
    return NextResponse.json(
        { message: 'Unauthorized. You do not have permission to perform this action.' },
        { status: 403 }
    );
};

// Function to update the role of a user
const updateUserRole = async (userId, newRole) => {
    try {
        // Ensure the database is connected
        await dbConnect();

        // Find the user by ID and update their role
        const user = await User.findByIdAndUpdate(
            userId,
            { role: newRole },
            { new: true, runValidators: true } // Return the updated user and validate input
        );

        if (!user) {
            return { status: 404, message: 'User not found.' };
        }

        return { status: 200, message: 'User role updated successfully.', user };
    } catch (error) {
        console.error('Error updating user role:', error);
        return { status: 500, message: 'Internal server error', error: error.message };
    }
};

// API handler for POST requests
async function handlePOST(req) {
    try {
        const body = await req.json();
        const { userId, role } = body;

        // Validate input
        if (!userId || role === undefined) {
            return NextResponse.json(
                { message: 'User ID and role are required.' },
                { status: 400 }
            );
        }

        // Update user role in the database
        const result = await updateUserRole(userId, role);
        return NextResponse.json({ message: result.message, user: result.user }, { status: result.status });
    } catch (error) {
        console.error('Error handling POST request:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}

// Export POST handler with middleware for authentication and role checking
export const POST = authenticate((req) => {
    return checkRole(5)(handlePOST)(req);

});
