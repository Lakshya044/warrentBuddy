'use client';
import { useState, useEffect } from 'react';

export default function FirMapping() {
    const [policeStationId, setPoliceStationId] = useState('');
    const [firs, setFirs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFetchFirs = async () => {
        if (!policeStationId) {
            setError('Please enter a police station ID');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/fetch/fir', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ policeStationId })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch FIRs');
            }

            const data = await response.json();
            console.log("Fetched FIRs:", data); // Debugging line

            // Access the FIRs array from the response data
            const firData = data.fir || [];
            setFirs(firData);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('FIRs state:', firs); // Debugging the state update
    }, [firs]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 lg:px-8">
             <div className="max-w-3xl w-full">
                
                <h1 className="text-3xl font-bold mb-6 text-center">FIR </h1>
               
                <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <input
                        type="text"
                        value={policeStationId}
                        onChange={(e) => setPoliceStationId(e.target.value)}
                        placeholder="Enter Police Station ID"
                        className="border p-3 rounded mb-4 sm:mb-0 sm:flex-1"
                    />
                    <button
                        onClick={handleFetchFirs}
                        className="bg-blue-600 text-white p-3 rounded sm:w-auto w-full"
                    >
                        Fetch FIRs
                    </button>
                </div>

                {loading && <p className="text-gray-600">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {firs.length > 0 && (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border-b p-3 text-left">FIR No</th>
                                    <th className="border-b p-3 text-left">Accused Name</th>
                                    <th className="border-b p-3 text-left">Aadhar No</th>
                                    <th className="border-b p-3 text-left">Details</th>
                                    <th className="border-b p-3 text-left">Pincode</th>
                                    <th className="border-b p-3 text-left">Address</th>
                                    <th className="border-b p-3 text-left">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {firs.map((fir) => (
                                    <tr key={fir._id}>
                                        <td className="border-b p-3">{fir.firNo}</td>
                                        <td className="border-b p-3">{fir.accusedName}</td>
                                        <td className="border-b p-3">{fir.aadharNo}</td>
                                        <td className="border-b p-3">{fir.details}</td>
                                        <td className="border-b p-3">{fir.pincode}</td>
                                        <td className="border-b p-3">{fir.address}</td>
                                        <td className="border-b p-3">{fir.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {firs.length === 0 && !loading && !error && (
                    <p className="text-center">Enter  Correct Police Station Id.</p>
                )}
            </div>
        </div>
    );
}
