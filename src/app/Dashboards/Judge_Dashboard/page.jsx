
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  

import Unauthorized from '@/components/unauthorized';  
import WarrantMapping from '@/components/judge/Fetch_Issued_Warrants';
import BailManagement from '@/components/judge/Bail_Fetch_and_Approve';
import CreateWarrant from '@/components/judge/Create_Warrant';

export default function JudgeDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null); 
  useEffect(() => {
    const userRole = localStorage.getItem('role');  
    if (userRole === '4') {  
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
      <h1 className="text-3xl font-bold mb-6 text-center">Judge Dashboard</h1>

      <WarrantMapping/>
      <BailManagement/>
      <CreateWarrant/>

    </div>
  );
}
