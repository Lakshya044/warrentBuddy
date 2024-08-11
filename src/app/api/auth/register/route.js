import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/dbconnect';
import { Client } from '@/model/user/userModel';
import { NextResponse } from 'next/server';
dbConnect();
export async function POST(req,res) {

   
    
    // Ensure the method is POST
    if (req.method !== 'POST') {
        return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
    }

    const { name, email, password, country, address, city, pincode, phonenumber } = await req.json();
console.log(req.json);
    // Validate required fields
    

    // Check if the email already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
        return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new client
    const newClient = new Client({
        username: name,
        email,
        password: hashedPassword,
        country,
        address,
        city,
        pincode,
        phonenumber,
        role: 4, // Default role for clients
    });

    await newClient.save();
   

    return NextResponse.json({ message: 'Client registered successfully' }, { status: 201 });
}
