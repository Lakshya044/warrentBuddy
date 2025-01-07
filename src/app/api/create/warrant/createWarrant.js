import { Warrant } from "@/model/user/warrantModel";
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
