'use client';
import { useState, useEffect } from 'react';

export default function BailMapping() {
    const [policeStationId, setPoliceStationId] = useState('');
    const [bails, setBails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchBails = async () => {
        if (!policeStationId) {
            setError('Please enter a Police Station ID');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/fetch/bail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ policeStationId })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch bail requests');
            }

            const data = await response.json();
            console.log("Fetched Bails:", data); // Debugging line

            // Access the bail array from the response data
            const bailData = data.bail || [];
            setBails(bailData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Bails state:', bails); // Debugging the state update
    }, [bails]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 lg:px-8 bg-gray-100">
            <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-6">
                
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Bail Requests</h1>
                
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <input
                        type="text"
                        value={policeStationId}
                        onChange={(e) => setPoliceStationId(e.target.value)}
                        placeholder="Enter Police Station ID"
                        className="border border-gray-300 p-3 rounded mb-4 sm:mb-0 sm:flex-1"
                    />
                    <button
                        onClick={handleFetchBails}
                        className="bg-blue-600 text-white p-3 rounded sm:w-auto w-full"
                    >
                        Fetch Bails
                    </button>
                </div>

                {loading && <p className="text-gray-600 text-center">Loading...</p>}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {bails.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 divide-y divide-gray-300">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Aadhar No</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Accused Name</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Details</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Pincode</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Address</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Police Station ID</th>
                                    <th className="border-b p-3 text-left text-sm font-semibold">Status</th>
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
                                        <td className="border-b p-3 text-sm">{bail.policeStationId}</td>
                                        <td className="border-b p-3 text-sm">{bail.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {bails.length === 0 && !loading && !error && (
                    <p className="text-center text-gray-600">No bail requests found for the provided Police Station ID.</p>
                )}
            </div>
        </div>
    );
}
