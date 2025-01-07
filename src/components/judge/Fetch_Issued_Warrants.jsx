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
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ policeStationId }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch warrants');
            }

            const data = await response.json();
            setWarrants(data.warrant?.reverse() || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = async (warrantId) => {
        try {
            const response = await fetch(`/api/download/warrant/${warrantId}`);
            if (!response.ok) {
                throw new Error('Failed to download FIR');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `FIR_${warrantId}.docx`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        console.log('Warrants state:', warrants);
    }, [warrants]);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center px-4 lg:px-8"
            style={{
                background: 'radial-gradient(circle, rgba(253, 248, 225, 1) 5%, rgba(109, 76, 65, 1) 81%)',
            }}
        >
            <div className="max-w-5xl w-full bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-4xl font-bold mb-6 text-center text-[#6D4C41]">Warrants</h1>
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <input
                        type="text"
                        value={policeStationId}
                        onChange={(e) => setPoliceStationId(e.target.value)}
                        placeholder="Enter Police Station ID"
                        className="border border-[#6D4C41] p-3 rounded w-full sm:w-auto sm:flex-1"
                    />
                    <button
                        onClick={handleFetchWarrants}
                        className="bg-[#6D4C41] hover:bg-[#5A3A35] text-white p-3 rounded sm:w-auto w-full font-bold"
                    >
                        Fetch Warrants
                    </button>
                </div>

                {loading && <p className="text-center text-[#6D4C41]">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {warrants.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-[#F9F9F9] border border-[#6D4C41] rounded-lg">
                            <thead>
                                <tr className="bg-[#6D4C41] text-white">
                                    <th className="p-4 text-left">Warrant No</th>
                                    <th className="p-4 text-left">Warrant Type</th>
                                    <th className="p-4 text-left">Accused Name</th>
                                    <th className="p-4 text-left">Details</th>
                                    <th className="p-4 text-left">Status</th>
                                    <th className="p-4 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {warrants.map((warrant) => (
                                    <tr key={warrant._id} className="hover:bg-[#FFE9D6]">
                                        <td className="p-4 border-b border-[#6D4C41]">{warrant.warrantNo}</td>
                                        <td className="p-4 border-b border-[#6D4C41]">{warrant.warrantType}</td>
                                        <td className="p-4 border-b border-[#6D4C41]">{warrant.accusedName}</td>
                                        <td className="p-4 border-b border-[#6D4C41]">{warrant.details}</td>
                                        <td className="p-4 border-b border-[#6D4C41]">{warrant.status}</td>
                                        <td className="p-4 border-b border-[#6D4C41] text-center">
                                            <button
                                                onClick={() => handleDownload(warrant._id)}
                                                className="bg-[#5A3A35] hover:bg-[#472D27] text-white px-3 py-1 rounded"
                                            >
                                                Download FIR
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {warrants.length === 0 && !loading && !error && (
                    <p className="text-center text-gray-600">Enter a valid Police Station ID to view warrants.</p>
                )}
            </div>
        </div>
    );
}
