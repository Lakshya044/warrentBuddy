'use client';
import { useState } from 'react';

export default function WarrantManagement() {
    const [policeStationId, setPoliceStationId] = useState('');
    const [warrants, setWarrants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchWarrants = async () => {
        if (!policeStationId) {
            setError("Please provide a Police Station ID");
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/fetch/warrant', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ policeStationId }),
            });
            console.log(response) ;
            console.log("Warrant Fetch Response at Police Dashboard is " , response ) ;
            if (!response.ok) {
                throw new Error("Failed to fetch warrants");
            }

            const data = await response.json();
            console.log(data) ;
            setWarrants(data.warrant || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateVisibility = async (warrantNo, visibleToUser) => {
        try {
            const response = await fetch('/api/create/release_warrant_to_citizen', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ warrantNo, visibleToUser }),
            });


            console.log("response", response);
            if (!response.ok) {
                throw new Error("Failed to update visibility");
            }else{
                const responseData = await response.json();
                alert(`Success: ${responseData.message}`);
            }

            setSuccess(`Warrant visibility updated successfully`);
            fetchWarrants();
        } catch (err) {
            setError(err.message);
        }
    };

    const handleMarkExecuted = async (warrantNo) => {
        try {
            const response = await fetch('/api/create/mark_warrant_as_executed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ warrantNo }),
            });
            console.log("response for marking warrant as executed" , response ) ;
            if (!response.ok) {
                throw new Error("Failed to mark as executed");
            }else{
                const responseData = await response.json();

               
                alert(`Success: ${responseData.message}`);
            }

            setSuccess(`Warrant marked as executed successfully`);
            fetchWarrants();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="h-[400px] flex flex-col items-center justify-center px-4 lg:px-8"
            style={{
                background: 'radial-gradient(circle, rgba(255, 247, 237, 1) 5%, rgba(67, 41, 36, 1) 85%)',
            }}>
            <div className="w-full bg-white shadow-lg rounded-lg p-6 border border-[#3E2723]">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#6D4C41]">
                    Warrant Management
                </h1>

                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <input
                        type="text"
                        value={policeStationId}
                        onChange={(e) => setPoliceStationId(e.target.value)}
                        placeholder="Enter Police Station ID"
                        className="border border-[#6D4C41] p-3 rounded mb-4 sm:mb-0 sm:flex-1"
                    />
                    <button
                        onClick={fetchWarrants}
                        className="bg-[#6D4C41] text-[#FFF7ED] p-3 rounded sm:w-auto w-full hover:bg-[#5A3A35]"
                    >
                        Fetch Warrants
                    </button>
                </div>

                {loading && <p className="text-[#6D4C41] text-center">Loading...</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}
                {success && <p className="text-green-600 text-center">{success}</p>}

                {warrants.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-[#6D4C41] divide-y divide-[#6D4C41]">
                            <thead className="bg-[#FFECB3]">
                                <tr>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Warrant No</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Warrant Status</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Accused Name</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Address</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Details</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warrants.map((warrant) => (
                                    <tr key={warrant._id}>
                                        <td className="border-b p-3 text-sm">{warrant.warrantNo}</td>
                                        <td className="border-b p-3 text-sm">{warrant.status}</td>
                                        <td className="border-b p-3 text-sm">{warrant.accusedName}</td>
                                        <td className="border-b p-3 text-sm">{warrant.address}</td>
                                        <td className="border-b p-3 text-sm">{warrant.details}</td>
                                        <td className="border-b p-3 text-sm">
                                            <button
                                                className="bg-[#207918] text-white px-3 py-1 rounded mr-2 hover:bg-[#2a8122]"
                                                onClick={() => handleUpdateVisibility(warrant.warrantNo, true)}
                                            >
                                                Release to User
                                            </button>
                                            <button
                                                className="bg-[#a11c1c] text-white px-3 py-1 rounded hover:bg-[#842222]"
                                                onClick={() => handleMarkExecuted(warrant.warrantNo)}
                                            >
                                                Mark Executed
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {warrants.length === 0 && !loading && !error && (
                    <p className="text-center text-[#6D4C41]">
                        No warrants found for the provided Police Station ID.
                    </p>
                )}
            </div>
        </div>
    );
}
