
'use client'

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Unauthorized from '@/components/unauthorized';
import WarrantManagement from '@/components/police/Warrant_Management';
import BailManagement from '@/components/police/Bail_Management';

export default function PoliceDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('role'); 
    if (userRole === '3') {
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
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Police Dashboard</h1>
      <WarrantManagement/>
      <BailManagement/>
    </div>
  );
}
