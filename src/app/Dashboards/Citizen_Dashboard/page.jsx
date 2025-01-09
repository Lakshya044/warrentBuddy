'use client'

import FetchBailAaadharNo from "@/components/Citizen/Fetch_Bail_AadharNo";
import UserWarrant from "@/components/Citizen/Fetch_Warrant_AadharNo";

export default function UserDashboard() {
    return (
        <div className="container mx-auto p-4">
            <UserWarrant/>
            <FetchBailAaadharNo/>
        </div>
    );
}
