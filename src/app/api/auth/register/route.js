import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbconnect';
import User from '@/model/user/user_model'; // Import the new User model
import { NextResponse } from 'next/server';

dbConnect();

export async function POST(req, res) {
    // Ensure the method is POST
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    const { name, email, password, country, address, city, pincode, phonenumber } = await req.json();
    console.log("Response at register route" , req) 
    // Check if all required fields are present
    if (!name || !email || !password || !country || !address || !city || !pincode || !phonenumber) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user
    const newUser = new User({
        name,         
        email,
        password: hashedPassword,
        country,
        address,
        city,
        pincode,
        phonenumber,
        role: 1, 
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
}