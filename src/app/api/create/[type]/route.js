
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import { FIR } from '@/model/user/firModel'; 
import { Bail } from '@/model/user/bailModel';
import { authenticate, checkRole } from '@/middleware/authMiddleware';
import { Warrant } from "@/model/user/warrantModel";
// Function to handle unauthorized access
const handleUnauthorized = () => {
    return NextResponse.json({ message: 'Unauthorized. You do not have permission to perform this action.' }, { status: 403 });
};

// CREATE WARRANT
const createWarrant = async (body) => {
    const { warrantType, accusedName, aadharNo, details, pincode, policeStationId, address} = body;

    if (!warrantType || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    if (!['Arrest Warrant', 'Search Warrant'].includes(warrantType)) {
        return NextResponse.json({ message: 'Invalid warrant type' }, { status: 400 });
    }

    let lastWarrant = await Warrant.findOne().sort({ warrantNo: -1 }); 
    let nextWarrantNo = lastWarrant ? (parseInt(lastWarrant.warrantNo) + 1).toString() : '1001'; 

    const newWarrant = new Warrant({
        warrantNo: nextWarrantNo,
        warrantType,
        accusedName,
        aadharNo,
        details,
        pincode,
        policeStationId,
        address,
        status: 'Pending', 
    });

    try {
        await newWarrant.save();
        console.log("Warrant has been issued Successfully") ;
        return NextResponse.json({ 
            message: 'Warrant issued successfully', 
            warrantId: newWarrant._id 
        },{ 
            status: 201 
        });
    } catch (error) {
        console.error('Error creating warrant:', error);
        return NextResponse.json({ message: 'Error processing the warrant request' }, { status: 500 });
    }
};

// UPDATE WARRANT TO USER
const updateWarrantVisibility = async (body) => {
    const { warrantNo, visibleToUser } = body;

    console.log("Received body for making the warrant visible to user:", body);

    // Check if warrantNo is missing
    if (!warrantNo) {
        console.error("Error: Warrant number is required");
        return { status: 400, message: "Warrant number is required" };
    }

    try {
        console.log("Connecting to the database...");
        await dbConnect();

        // Log the warrantNo and visibleToUser before the query
        console.log("Updating warrant visibility for:", { warrantNo, visibleToUser });

        const warrant = await Warrant.findOneAndUpdate(
            { warrantNo },
            { visibleToUser },
            { new: true }
        );

        // Check if warrant was found
        if (!warrant) {
            console.error("Error: Warrant not found for warrantNo:", warrantNo);
            return NextResponse.json(
                { status: 404, message: "Warrant not found" },
                { status: 404 }
            );
        }

        console.log("Warrant updated successfully:", warrant);
        return NextResponse.json(
            { status: 200, message: `Warrant visibility updated to: ${visibleToUser}` },
            { status: 200 }
        );
    } catch (error) {
        // Log the error
        console.error("Error during database operation:", error);
        return NextResponse.json(
            { status: 500, message: "Failed to update warrant visibility", error: error.message },
            { status: 500 }
        );
    }
};

  
// UPDATE THE STATUS OF A WARRANT AS EXECUTED FROM PENDING

const updateWarrantStatus = async (body) => {
    const { warrantNo } = body

    console.log("Received body:", { warrantNo });

    // Check if warrantNo is missing
    if (!warrantNo) {
        console.error("Error: Warrant number is required");
        return NextResponse.json({ status: 400, message: "Warrant number is required" }, { status: 400 });
    }

    try {
        console.log("Connecting to the database...");
        await dbConnect();

        // Log the warrantNo before the query
        console.log("Updating warrant status for:", { warrantNo });

        const warrant = await Warrant.findOneAndUpdate(
            { warrantNo },
            { status: "Persued" },
            { new: true } 
        );

        // Check if warrant was found
        if (!warrant) {
            console.error("Error: Warrant not found for warrantNo:", warrantNo);
            return NextResponse.json({ status: 404, message: "Warrant not found" }, { status: 404 });
        }

        console.log("Warrant updated successfully:", warrant);
        return NextResponse.json({ status: 200, message: "Warrant marked as executed successfully", warrant }, { status: 200 });
    } catch (error) {
        // Log the error
        console.error("Error during database operation:", error);
        return NextResponse.json({ status: 500, message: "Failed to update warrant status", error: error.message }, { status: 500 });
    }
};


// Function to process bail requests
// const processBailRequest = async (body) => {
//     const { aadharNo, accusedName, details, policeStationId, address, pincode } = body;

//     if (!aadharNo || !accusedName || !pincode || !details || !policeStationId || !address) {
//         return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
//     }

//     const newBail = new Bail({ aadharNo, accusedName, details, pincode, policeStationId, address, status: 'Pending' });
//     await newBail.save();
//     return NextResponse.json({ message: 'Bail request submitted successfully', bailId: newBail._id }, { status: 201 });
// };

// Function to process bail approval/rejection
const processBailApproval = async (body) => {
    const { policeStationId, aadharNo, approvalStatus } = body;

    if (!policeStationId || !aadharNo || approvalStatus === undefined) {
        return NextResponse.json({ message: 'Bail ID and approval status are required' }, { status: 400 });
    }

    const bail = await Bail.findOne({ policeStationId });
    if (!bail) {
        return NextResponse.json({ message: 'Bail request not found' }, { status: 404 });
    }

    bail.status = approvalStatus;
    await bail.save();
    return NextResponse.json({ message: `Bail ${approvalStatus} processed successfully` }, { status: 200 });
};


// Main POST handler function
async function handlePOST(req) {
    try {
        await dbConnect();

        const url = new URL(req.url);
        const type = url.pathname.split('/')[3];
        const body = await req.json();
        console.log("Type of request is " , type) ;
        if (type === 'create_warrant') {
            return await createWarrant(body);

        }else if(type ==='release_warrant_to_citizen'){
            return await updateWarrantVisibility(body) ;
        }else if(type ==='mark_warrant_as_executed'){
            return await updateWarrantStatus(body) ;
        }
        else if (type === 'requestbail') {
            return await processBailRequest(body);

        } else if (type === 'bailapprove') {
            return await processBailApproval(body);
        }
         else {
            return NextResponse.json({ message: 'Invalid request type' }, { status: 400 });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}

// Wrapping handler functions with appropriate role checks
export const POST = authenticate((req, res, next) => {
    const url = new URL(req.url);
    const type = url.pathname.split('/')[3];
  console.log("hiii it is handler function for role checks")
    if (type === 'create_warrant' || type === 'bailapprove') {
        return checkRole(4)(handlePOST)(req, res, next); 
    } else if (type === 'release_warrant_to_citizen' || type ==='mark_warrant_as_executed') {
        return checkRole(3)(handlePOST)(req, res, next); 
    } else {
        return handleUnauthorized();
    }
});
