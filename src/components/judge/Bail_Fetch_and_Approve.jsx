'use client';
import { useState, useEffect } from 'react';

export default function BailManagement() {
    const [policeStationId, setPoliceStationId] = useState('');
    const [bails, setBails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleFetchBails = async () => {
        if (!policeStationId) {
            setError('Please enter a Police Station ID');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/fetch/bail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ policeStationId }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch bail requests');
            }

            const data = await response.json();
            setBails(data.bail || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleApproveBail = async (aadharNo, approvalStatus) => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('/api/create/bailapprove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    policeStationId,
                    aadharNo,
                    approvalStatus,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Failed to update bail status');
            }

            setSuccess(`Bail for Aadhar No: ${aadharNo} has been ${approvalStatus}`);
            handleFetchBails(); // Refresh bails list after update
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[400px] flex flex-col items-center justify-center px-4 lg:px-8"
        style={{
            background: 'radial-gradient(circle, rgba(253, 248, 225, 1) 5%, rgba(109, 76, 65, 1) 81%)',
        }}>
            <div className="w-full bg-white shadow-lg rounded-lg p-6 border border-[#3E2723]">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#6D4C41]">
                    Bail Management
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
                        onClick={handleFetchBails}
                        className="bg-[#6D4C41] text-[#FDF8E1] p-3 rounded sm:w-auto w-full hover:bg-[#5A3A35]"
                    >
                        Fetch Bails
                    </button>
                </div>

                {loading && <p className="text-[#6D4C41] text-center">Loading...</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}
                {success && <p className="text-green-600 text-center">{success}</p>}

                {bails.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-[#6D4C41] divide-y divide-[#6D4C41]">
                            <thead className="bg-[#FFECB3]">
                                <tr>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Aadhar No</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Accused Name</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Details</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Pincode</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Address</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Status</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bails.map((bail) => (
                                    <tr key={bail._id}>
                                        <td className="border-b p-3 text-sm">{bail.aadharNo}</td>
                                        <td className="border-b p-3 text-sm">{bail.accusedName}</td>
                                        <td className="border-b p-3 text-sm">{bail.details}</td>
                                        <td className="border-b p-3 text-sm">{bail.pincode}</td>
                                        <td className="border-b p-3 text-sm">{bail.address}</td>
                                        <td className="border-b p-3 text-sm">{bail.status}</td>
                                        <td className="border-b p-3 text-sm">
                                            <button
                                                className="bg-green-600 text-white px-3 py-1 rounded mr-2 hover:bg-green-700"
                                                onClick={() => handleApproveBail(bail.aadharNo, 'Approved')}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                                onClick={() => handleApproveBail(bail.aadharNo, 'Rejected')}
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {bails.length === 0 && !loading && !error && (
                    <p className="text-center text-[#6D4C41]">
                        No bail requests found for the provided Police Station ID.
                    </p>
                )}
            </div>
        </div>
    );
}
