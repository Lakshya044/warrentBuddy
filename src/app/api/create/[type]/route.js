
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import { Warrant,UserWarrant } from '@/model/user/warrantModel'; 
import { FIR } from '@/model/user/warrantModel'; 
import { Bail } from '@/model/user/bailModel';
import { authenticate, checkRole } from '@/middleware/authMiddleware';

// Function to handle unauthorized access
const handleUnauthorized = () => {
    return NextResponse.json({ message: 'Unauthorized. You do not have permission to perform this action.' }, { status: 403 });
};

// Function to process warrant requests
const processWarrantRequest = async (body) => {
    const { warrantNo, warrantType, accusedName, aadharNo, details, pincode, policeStationId, address } = body;

    if (!warrantNo || !warrantType || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const newWarrant = new UserWarrant({ warrantNo, warrantType, accusedName, aadharNo, details, pincode, policeStationId, address });
    await newWarrant.save();
    return NextResponse.json({ message: 'Warrant issued successfully', warrantId: newWarrant._id }, { status: 201 });
};

// Function to process FIR requests
const processFIRRequest = async (body) => {
    const { firNo, accusedName, aadharNo, details, pincode, policeStationId, address } = body;

    if (!firNo || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
        return NextResponse.json({ message: 'All FIR fields are required' }, { status: 400 });
    }

    const newFIR = new FIR({ firNo, accusedName, aadharNo, details, pincode, policeStationId, address });
    await newFIR.save();
    return NextResponse.json({ message: 'FIR created successfully', firId: newFIR._id }, { status: 201 });
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

// Function to process UserWarrant requests
const processUserWarrantRequest = async (body) => {
    const { warrantNo, warrantType, accusedName, aadharNo, details, pincode, status,address } = body;

    if (!warrantNo || !warrantType || !accusedName || !aadharNo || !details || !pincode||!status || !address) {
        return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const newUserWarrant = new UserWarrant({ warrantNo, warrantType, accusedName, aadharNo, details, pincode, address, status });
    await newUserWarrant.save();
    return NextResponse.json({ message: 'User Warrant created successfully', warrantId: newUserWarrant._id }, { status: 201 });
};

// Main POST handler function
async function handlePOST(req) {
    try {
        await dbConnect();

        const url = new URL(req.url);
        const type = url.pathname.split('/')[3];
        const body = await req.json();

        if (type === 'warrant') {
            return await processWarrantRequest(body);

        } else if (type === 'FIR') {
            return await processFIRRequest(body);

        } else if (type === 'requestbail') {
            return await processBailRequest(body);

        } else if (type === 'bailapprove') {
            return await processBailApproval(body);

        } else if (type === 'userwarrant') {
            return await processUserWarrantRequest(body);

        } else {
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

    if (type === 'warrant' || type === 'bailapprove') {
        return checkRole(1)(handlePOST)(req, res, next); // Role 1 for warrant and bail approval
    } else if (type === 'FIR' || type === 'userwarrant') {
        return checkRole(2)(handlePOST)(req, res, next); // Role 2 for FIR and user warrant
    // } else if (type === 'requestbail') {
    //     return handlePOST(req, res); // No role restriction for requesting bail
    } else {
        return handleUnauthorized(); // Handle any other cases as unauthorized
    }
});
