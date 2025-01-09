'use client';
import { useState } from 'react';

const FetchBailAaadharNo = () => {
    const [aadharNo, setAadharNo] = useState('');
    const [bailRequests, setBailRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchBailRequests = async () => {
        if (!aadharNo) {
            setError("Please provide a Police Station ID");
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/fetch/bail_on_aadhar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadharNo }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch bail requests");
            }

            const data = await response.json();
            console.log("Bail Fetch Response at Citizen Dashboard:", data);

            setBailRequests(data.bail || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="h-[400px] flex flex-col items-center justify-center px-4 lg:px-8"
            style={{
                background: 'radial-gradient(circle, rgba(255, 247, 237, 1) 5%, rgba(67, 41, 36, 1) 85%)',
            }}
        >
            <div className="w-full bg-white shadow-lg rounded-lg p-6 border border-[#3E2723]">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#6D4C41]">
                    Requested Bail Applications for a User
                </h1>

                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <input
                        type="text"
                        value={aadharNo}
                        onChange={(e) => setAadharNo(e.target.value)}
                        placeholder="Enter Your Aadhar No."
                        className="border border-[#6D4C41] p-3 rounded mb-4 sm:mb-0 sm:flex-1"
                    />
                    <button
                        onClick={fetchBailRequests}
                        className="bg-[#6D4C41] text-[#FFF7ED] p-3 rounded sm:w-auto w-full hover:bg-[#5A3A35]"
                    >
                        Fetch Bail Requests
                    </button>
                </div>

                {loading && <p className="text-[#6D4C41] text-center">Loading...</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}
                {success && <p className="text-green-600 text-center">{success}</p>}

                {bailRequests.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-[#6D4C41] divide-y divide-[#6D4C41]">
                            <thead className="bg-[#FFECB3]">
                                <tr>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Aadhar Number</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Accused Name</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Details</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Status</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Pincode</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bailRequests.map((bail) => (
                                    <tr key={bail._id}>
                                        <td className="border-b p-3 text-sm">{bail.aadharNo}</td>
                                        <td className="border-b p-3 text-sm">{bail.accusedName}</td>
                                        <td className="border-b p-3 text-sm">{bail.details}</td>
                                        <td className="border-b p-3 text-sm">{bail.status}</td>
                                        <td className="border-b p-3 text-sm">{bail.pincode}</td>
                                        <td className="border-b p-3 text-sm">{bail.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {bailRequests.length === 0 && !loading && !error && (
                    <p className="text-center text-[#6D4C41]">
                        No bail requests found for the provided Aadhar No.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FetchBailAaadharNo;
