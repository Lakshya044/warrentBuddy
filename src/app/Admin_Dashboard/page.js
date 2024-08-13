import WarrantMapping from '@/components/judge/mapped_warrent';
import CreateWarrant from '@/components/judge/create_warrent';
import FirMapping from '@/components/judge/mapped_fir';
import ApproveBail from '@/components/judge/approve_bail';

export default function AdminDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Dashboard</h1>
            <div className="flex flex-col  md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                {/* Warrant Mapping Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                    <WarrantMapping />
                </div>
                {/* Create Warrant Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                    <CreateWarrant />
                </div>
            </div>

            {/* Second Row of Components */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
                {/* FIR Mapping Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                    <FirMapping/>
                </div>
                {/* Approve Bail Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                    <ApproveBail/>
                </div>
            </div>
        </div>
    );
}
