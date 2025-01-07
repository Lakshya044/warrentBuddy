import dbConnect from '@/lib/dbconnect';
import { Warrant, FIR } from '@/model/user/warrantModel'; 
import { Bail } from '@/model/user/bailModel';
import { NextResponse } from 'next/server';

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
            const userWarrant = await UserWarrant.findOne({ aadharNo });
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

        } else if (type === 'fir') {
            console.log("Fetching FIR details...");
            const fir = await FIR.find({ policeStationId });
            console.log("FIR fetched:", fir);

            if (!fir) {
                return NextResponse.json({ message: 'FIR not found' }, { status: 404 });
            }

            return NextResponse.json({ fir }, { status: 200 });

        } else if (type === 'userfir') {
            console.log("Fetching user FIR details...");
            const userFIRs = await FIR.find({ aadharNo });
            console.log("User FIRs fetched:", userFIRs);

            if (userFIRs.length === 0) {
                return NextResponse.json({ message: 'No FIRs found for this Aadhar number' }, { status: 404 });
            }

            return NextResponse.json({ userFIRs }, { status: 200 });

        } 
        else if(type==='requestbail'){
            
                const { aadharNo, accusedName, details, policeStationId, address, pincode } = body;
            
                if (!aadharNo || !accusedName || !pincode || !details || !policeStationId || !address) {
                    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
                }
            
                const newBail = new Bail({ aadharNo, accusedName, details, pincode, policeStationId, address, status: 'Pending' });
                await newBail.save();
                return NextResponse.json({ message: 'Bail request submitted successfully', bailId: newBail._id }, { status: 201 });
           
        }else {
            console.log("Invalid request type");
            return NextResponse.json({ message: 'Invalid request type' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}
