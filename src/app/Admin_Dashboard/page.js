// import WarrantMapping from '@/components/judge/mapped_warrent';
// import CreateWarrant from '@/components/judge/create_warrent';
// import BailMapping from '@/components/judge/mapped_bail';
// import ApproveBail from '@/components/judge/approve_bail';

// export default function AdminDashboard() {
//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Judge</h1>
//             <div className="flex flex-col  md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//                 {/* Warrant Mapping Component */}
//                 <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
//                     <WarrantMapping />
//                 </div>
//                 {/* Create Warrant Component */}
//                 <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
//                     <CreateWarrant />
//                 </div>
//             </div>

//             {/* Second Row of Components */}
//             <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
//                 {/* FIR Mapping Component */}
//                 <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
//                     <BailMapping/>
//                 </div>
//                 {/* Approve Bail Component */}
//                 <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
//                     <ApproveBail/>
//                 </div>
//             </div>
//         </div>
//     );
// }
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  
import WarrantMapping from '@/components/judge/mapped_warrent';  
import CreateWarrant from '@/components/judge/create_warrent';  
import BailMapping from '@/components/judge/mapped_bail';  
import ApproveBail from '@/components/judge/approve_bail';  
import Unauthorized from '@/components/unauthorized';  // Unauthorized access component

export default function JudgeDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null);  // State to manage authorization status

  useEffect(() => {
    const userRole = localStorage.getItem('role');  // Get the user's role from localStorage
    if (userRole === '2') {  // Role '3' corresponds to Judge
      setIsAuthorized(true);  // Authorized if the role is '3'
    } else {
      setIsAuthorized(false);  // Unauthorized otherwise
    }
  }, []);  // The effect will run once when the component mounts

  if (isAuthorized === null) {
    return <div>Loading...</div>;  // Show loading until we have the authorization data
  }

  if (isAuthorized === false) {
    return <Unauthorized />;  // If the user is not authorized, render Unauthorized page
  }

  // Authorized user view (Judge Dashboard)
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Judge Dashboard</h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
        {/* Bail Mapping Component */}
        <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
          <BailMapping />
        </div>
        {/* Approve Bail Component */}
        <div className="w-full md:w-1/2 p-4 bg-gray-300 rounded-md">
          <ApproveBail />
        </div>
      </div>
    </div>
  );
}
