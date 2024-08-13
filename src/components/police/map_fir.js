'use client';
import { useState, useEffect } from 'react';

export default function FirMapping() {
  const [firData, setFirData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch FIR data from the API
    const fetchFirData = async () => {
      try {
        const response = await fetch('/api/fetch/fIR'); // Adjust the API endpoint as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFirData(data);
      } catch (err) {
        setError('Failed to fetch FIR data.');
      }
    };

    fetchFirData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">FIR Mapping</h2>
      {error && <p className="text-red-400 text-center mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 bg-gray-800 text-gray-100">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">FIR No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Accused Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Aadhar No</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Details</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Pincode</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Police Station ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Address</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {firData.map((fir) => (
              <tr key={fir.firNo}>
                <td className="px-4 py-2 text-sm">{fir.firNo}</td>
                <td className="px-4 py-2 text-sm">{fir.accusedName}</td>
                <td className="px-4 py-2 text-sm">{fir.aadharNo}</td>
                <td className="px-4 py-2 text-sm">{fir.details}</td>
                <td className="px-4 py-2 text-sm">{fir.pincode}</td>
                <td className="px-4 py-2 text-sm">{fir.policeStationId}</td>
                <td className="px-4 py-2 text-sm">{fir.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
