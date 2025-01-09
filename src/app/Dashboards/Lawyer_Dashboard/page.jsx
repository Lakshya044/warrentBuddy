'use client'

import RequestBail from "@/components/Lawyer/Request_Bail";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  
import Unauthorized from '@/components/unauthorized'; 


export default function UserDashboard() {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(null); 

    useEffect(() => {
            const userRole = localStorage.getItem('role');  
            if (userRole === '2') {  
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
            <RequestBail/>
        </div>
    );
}
