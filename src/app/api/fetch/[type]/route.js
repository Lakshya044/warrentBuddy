import dbConnect from '@/lib/dbconnect';
import { Warrant } from '@/model/user/warrantModel'; 
import { Bail } from '@/model/user/bailModel';
import User from '@/model/user/user_model'
import { NextResponse } from 'next/server';
console.log("User Model:", User);
export async function POST(req) {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Database connected successfully");

        const url = new URL(req.url, `http://${req.headers.host}`);
        const type = url.pathname.split('/')[3]; 
        const body = await req.json();
        const { aadharNo, policeStationId } = body;

        console.log(`Request type: ${type}, AadharNo: ${aadharNo}`);

        if (type === 'userwarrant') {
            console.log("Fetching user warrant details...");
            const userWarrant = await Warrant.findOne({ aadharNo });
            console.log("User warrant fetched:", userWarrant);

            if (!userWarrant) {
                return NextResponse.json({ message: 'User warrant not found' }, { status: 404 });
            }

            return NextResponse.json({ userWarrant }, { status: 200 });

        } else if (type === 'warrant') {
            console.log("Fetching warrant details...");
            const warrant = await Warrant.find({ policeStationId });
            console.log("Warrant fetched:", warrant);

            if (!warrant) {
                console.log("Typing warrant not found message")
                return NextResponse.json({ message: 'Warrant not found' }, { status: 404 });
            }

            return NextResponse.json({ warrant }, { status: 200 });

        } else if (type === 'bail') {
            console.log("Fetching bail details...");
            const bail = await Bail.find({ policeStationId });
            console.log("Bail fetched:", bail);

            if (!bail) {
                return NextResponse.json({ message: 'Bail not found' }, { status: 404 });
            }

            return NextResponse.json({ bail }, { status: 200 });

        }else if(type ==='bail_on_aadhar'){
            console.log("Fetching Bail request for the given aadhar")
            const bail = await Bail.find({aadharNo}) 
            console.log("Bail fetched" , bail) ;

            if(!bail){
                return NextResponse.json({message:"No Bail Requests Found"} , {status:404}) ;
            }
            return NextResponse.json({bail} , {status:200}) ;
        }
        
        else {
            console.log("Invalid request type");
            return NextResponse.json({ message: 'Invalid request type' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}


export const GET = async (req) => {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Database connected successfully");

        // Extract the 'type' from the URL path
        const url = new URL(req.url);
        const type = url.pathname.split('/')[3]; 

        if (type === 'all') {
            // Fetch all users from the database
            console.log("Fetching all users...");
            const users = await User.find({}).select("name email role phonenumber");
            console.log("Fetched users:", users);
            return NextResponse.json({ users }, { status: 200 });
        }

        // cases where the 'type' is not 'all'
        return NextResponse.json({ message: "Invalid type parameter" }, { status: 400 });

    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json({ message: "Error fetching users" }, { status: 500 });
    }
};