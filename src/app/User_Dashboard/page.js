
import ShowWarrant from '@/components/user/showwarrent';
import ShowFir from '@/components/user/showfir';
import RequestBail from '@/components/user/requestBail';
export default function UserDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">User</h1>
            <div className="flex flex-col  md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                {/* Warrant Mapping Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                <ShowFir/>
                </div>
                {/* Create Warrant Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                    <ShowWarrant />
                </div>
            </div>

            {/* Second Row of Components */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
                {/* FIR Mapping Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                <RequestBail />
                </div>
                {/* Approve Bail Component */}
                <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
                   {/* <UserWarrant/> */}
                </div>
            </div>
        </div>
    );
}
