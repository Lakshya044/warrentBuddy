
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  
import SuperAdminDashboard from '@/components/SuperUser/Rolechange'
import Unauthorized from '@/components/unauthorized'; 

export default function SuperUserDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null); 
  useEffect(() => {
    const userRole = localStorage.getItem('role');  
    if (userRole === '5') {  
      setIsAuthorized(true);  
    } else {
      setIsAuthorized(false);  
    }
  }, []);  

  if (isAuthorized === null) {
    return <div>Loading...</div>;  
  }

  if (isAuthorized === false) {
    return <Unauthorized />;  
  }

  return (
    <div className="container mx-auto p-4 bg-[#FDF8E1]">
      <h1 className="text-3xl font-bold mb-6 text-center">SuperAdmin Dashboard</h1>

      <SuperAdminDashboard/>

    </div>
  );
}
