'use client';
import { useState, useEffect } from 'react';

export default function WarrantMapping() {
    const [policeStationId, setPoliceStationId] = useState('');
    const [warrants, setWarrants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchWarrants = async () => {
        if (!policeStationId) {
            setError('Please enter a police station ID');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/fetch/warrant', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ policeStationId })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch warrants');
            }

            const data = await response.json();
            console.log("Fetched warrants:", data);

            const warrantData = data.warrant || [];
            // Reverse the warrantData array to show the most recent first
            setWarrants(warrantData.reverse());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Warrants state:', warrants);
    }, [warrants]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 lg:px-8">
            <div className="max-w-3xl w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">WARRANTS</h1>
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <input
                        type="text"
                        value={policeStationId}
                        onChange={(e) => setPoliceStationId(e.target.value)}
                        placeholder="Enter Police Station ID"
                        className="border p-3 rounded mb-4 sm:mb-0 sm:flex-1"
                    />
                    <button
                        onClick={handleFetchWarrants}
                        className="bg-blue-600 text-white p-3 rounded sm:w-auto w-full"
                    >
                        Fetch Warrants
                    </button>
                </div>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {warrants.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border-b p-3 text-left">Warrant No</th>
                                    <th className="border-b p-3 text-left">Warrant Type</th>
                                    <th className="border-b p-3 text-left">Accused Name</th>
                                    <th className="border-b p-3 text-left">Aadhar No</th>
                                    <th className="border-b p-3 text-left">Details</th>
                                    <th className="border-b p-3 text-left">Pincode</th>
                                    <th className="border-b p-3 text-left">Address</th>
                                    <th className="border-b p-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warrants.map((warrant) => (
                                    <tr key={warrant._id}>
                                        <td className="border-b p-3">{warrant.warrantNo}</td>
                                        <td className="border-b p-3">{warrant.warrantType}</td>
                                        <td className="border-b p-3">{warrant.accusedName}</td>
                                        <td className="border-b p-3">{warrant.aadharNo}</td>
                                        <td className="border-b p-3">{warrant.details}</td>
                                        <td className="border-b p-3">{warrant.pincode}</td>
                                        <td className="border-b p-3">{warrant.address}</td>
                                        <td className="border-b p-3">{warrant.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {warrants.length === 0 && !loading && !error && (
                    <p className="text-center">Enter Correct Police Station Id.</p>
                )}
            </div>
        </div>
    );
}
