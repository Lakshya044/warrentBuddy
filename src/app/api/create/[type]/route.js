import dbConnect from '@/lib/dbconnect';
import { authenticate, checkRole } from '@/middleware/authMiddleware';
import { Warrant, FIR } from '@/model/user/warrantModel'; 
import { Bail } from '@/model/user/bailModel';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        console.log("Connecting to database...");
        await dbConnect();
        console.log("Database connected successfully");

        // Apply authentication middleware
        console.log("Applying authentication middleware...");
        const authenticatedUser = await authenticate(req);
        if (!authenticatedUser) {
            console.log("Authentication failed");
            return NextResponse.json({ message: 'Authentication failed' }, { status: 401 });
        }
        console.log('Authenticated user:', authenticatedUser);

        const url = new URL(req.url, `http://${req.headers.host}`);
        const type = url.pathname.split('/')[3]; // Extract type from pathname
        console.log(`Request type: ${type}`);

        if (type === 'warrant') {
            console.log("Processing warrant request...");
            const userHasRole = checkRole(1)(authenticatedUser);
            if (!userHasRole) {
                console.log("User does not have the required role");
                return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
            }

            const body = await req.json();
            const { warrantNo, warrantType, accusedName, aadharNo, details, pincode, policeStationId, status, address } = body;
            console.log("Request body parsed successfully");

            // Validate required fields
            if (!warrantNo || !warrantType || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
                console.log("Validation failed: Missing required fields");
                return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
            }

            // Create and save the new warrant
            const newWarrant = new Warrant({
                warrantNo,
                warrantType,
                accusedName,
                aadharNo,
                details,
                pincode,
                policeStationId,
                status: status || 'Pending',
                address
            });

            await newWarrant.save();
            console.log("Warrant issued successfully");
            return NextResponse.json({ message: 'Warrant issued successfully', warrantId: newWarrant._id }, { status: 201 });

        } 
        // else if (type === 'approve') {
        //     console.log("Processing bail approval request...");
            
        //     // Apply role checking middleware specifically for approval
        //     const userHasRole = checkRole(1)(authenticatedUser);
        //     if (!userHasRole) {
        //         console.log("User does not have the required role");
        //         return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        //     }

        //     const body = await req.json();
        //     const { warrantId, approvalStatus } = body;
        //     console.log("Request body parsed successfully");

        //     // Validate required fields
        //     if (!warrantId || approvalStatus === undefined) {
        //         console.log("Validation failed: Missing required fields");
        //         return NextResponse.json({ message: 'Warrant ID and approval status are required' }, { status: 400 });
        //     }

        //     // Find and update the warrant
        //     const warrant = await Warrant.findById(warrantId);
        //     if (!warrant) {
        //         console.log("Warrant not found");
        //         return NextResponse.json({ message: 'Warrant not found' }, { status: 404 });
        //     }

        //     // Update the warrant status based on the approval
        //     warrant.status = approvalStatus; // Example: 'Approved' or 'Rejected'
        //     await warrant.save();
        //     console.log("Bail approval processed successfully");
        //     return NextResponse.json({ message: 'Bail approval processed successfully', warrantId: warrant._id }, { status: 200 });
        // }

       else  if (type === 'FIR') {
            console.log("Processing FIR request...");
            
            // Apply role checking middleware specifically for FIR
            const userHasRole = checkRole(2)(authenticatedUser);
            if (!userHasRole) {
                console.log("User does not have the required role");
                return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
            }

            const body = await req.json();
            const { firNo, accusedName, aadharNo, details, pincode, policeStationId, address, warrantNo } = body;
            console.log("Request body parsed successfully");

            // Validate required fields
            if (!firNo || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
                return NextResponse.json({ message: 'All FIR fields are required' }, { status: 400 });
            }

            // Create and save the new FIR
            const newFIR = new FIR({
                firNo,
                accusedName,
                aadharNo,
                details,
                pincode,
                policeStationId,
                address,
            });

            await newFIR.save();
            console.log('FIR saved successfully:', newFIR);
            return NextResponse.json({ message: 'FIR created successfully', firId: newFIR._id }, { status: 201 });
        }

         else if (type === 'requestbail') {
            console.log("Processing bail request...");
            const body = await req.json();
            const { aadharNo, accusedName, details, policeStationId, address,pincode } = body;
            console.log("Request body parsed successfully");

            // Validate required fields
            if (!aadharNo || !accusedName ||!pincode|| !details || !policeStationId || !address) {
                console.log("Validation failed: Missing required fields");
                return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
            }

            // Create and save the new bail request
            const newBail = new Bail({
                aadharNo,
                accusedName,
                details,
                pincode,
                policeStationId,
                address,
                status: 'Pending'
            });

            await newBail.save();
            console.log("Bail request created successfully");
            return NextResponse.json({ message: 'Bail request submitted successfully', bailId: newBail._id }, { status: 201 });

        } else if (type === 'bailapprove') {
            console.log("Processing bail approval/rejection...");

            // Apply role checking middleware for approval/rejection
            console.log("Applying role checking middleware...");
            const userHasRole = checkRole(1)(authenticatedUser);
            if (!userHasRole) {
                console.log("User does not have the required role");
                return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
            }

            const body = await req.json();
            const { policeStationId, aadharNo, approvalStatus } = body;
            console.log("Request body parsed successfully");
console.log(policeStationId);
console.log(aadharNo);
console.log(approvalStatus);
            // Validate required fields
            if (!policeStationId||!aadharNo || approvalStatus === undefined) {
                console.log("Validation failed: Missing required fields");
                return NextResponse.json({ message: 'Bail ID and approval status are required' }, { status: 400 });
            }

            // Find and update the bail request
            const bail = await Bail.findOne({policeStationId : policeStationId});
            if (!bail) {
                console.log("Bail request not found");
                return NextResponse.json({ message: 'Bail request not found' }, { status: 404 });
            }

            // Update the bail status based on the approval
            bail.status = approvalStatus; // Example: 'Approved' or 'Rejected'
            await bail.save();
            console.log("Bail approval/rejection processed successfully");
            return NextResponse.json({ message: `Bail ${approvalStatus} processed successfully` }, { status: 200 });
        }

        console.log("Invalid request type");
        return NextResponse.json({ message: 'Invalid request type' }, { status: 400 });
    } catch (error) {
        console.error('Error handling request:', error);
        return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }
}
