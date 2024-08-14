'use client';
import { useState, useEffect } from 'react';

export default function ShowWarrant() {
  const [aadharNo, setAadharNo] = useState('');
  const [warrantData, setWarrantData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWarrantData = async () => {
    if (!aadharNo) {
      setError('Aadhaar number is required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/fetch/userwarrant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aadharNo }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("data", data);
      setWarrantData(data.userWarrant); // Access userWarrant from the response
    } catch (err) {
      setError('Failed to fetch warrant data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">User Warrant</h2>
      
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Aadhaar Number"
          value={aadharNo}
          onChange={(e) => setAadharNo(e.target.value)}
          className="px-4 py-2 border border-gray-300 bg-white text-gray-800 rounded-lg w-full sm:w-1/2"
        />
        <button
          onClick={fetchWarrantData}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Fetch Warrant
        </button>
      </div>

      {loading && <p className="text-gray-600 text-center mb-4">Loading...</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {warrantData && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300 bg-white text-gray-800">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold">Warrant No</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Warrant Type</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Accused Name</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Aadhar No</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Details</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Pincode</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Status</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Address</th>
                <th className="px-4 py-2 text-left text-sm font-semibold">Issue Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
              <tr key={warrantData._id}>
                <td className="px-4 py-2 text-sm">{warrantData.warrantNo}</td>
                <td className="px-4 py-2 text-sm">{warrantData.warrantType}</td>
                <td className="px-4 py-2 text-sm">{warrantData.accusedName}</td>
                <td className="px-4 py-2 text-sm">{warrantData.aadharNo}</td>
                <td className="px-4 py-2 text-sm">{warrantData.details}</td>
                <td className="px-4 py-2 text-sm">{warrantData.pincode}</td>
                <td className="px-4 py-2 text-sm">{warrantData.status}</td>
                <td className="px-4 py-2 text-sm">{warrantData.address}</td>
                <td className="px-4 py-2 text-sm">{new Date(warrantData.issueDate).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
