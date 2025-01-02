'use client'
import WarrantMapping from '@/components/judge/mapped_warrent';
import CreateFir from '@/components/police/create_fir';
import FirMapping from '@/components/police/map_fir';
import ApproveBail from '@/components/judge/approve_bail';
import UserWarrant from '@/components/police/userwarrent';

export default function PoliceDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Police</h1>
            <div className="flex flex-col  md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                {/* Warrant Mapping Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                <FirMapping/>
                </div>
                {/* Create Warrant Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                    <CreateFir />
                </div>
            </div>

            {/* Second Row of Components */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
                {/* FIR Mapping Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                <WarrantMapping />
                </div>
                {/* Approve Bail Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                   <UserWarrant/>
                </div>
            </div>
        </div>
    );
}
