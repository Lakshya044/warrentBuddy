'use client';
import { useState } from 'react';

export default function UserWarrant() {
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
      console.log("Response recieved for fetching User Warrant using aadharNo" , response) ;
      if (!response.ok) {
        throw new Error('Failed to fetch warrant data');
      }

      const data = await response.json();
      setWarrantData(data.userWarrant);
    } catch (err) {
      setError('Failed to fetch warrant data.');
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
    
      <div className="w-full bg-white shadow-lg rounded-lg p-6 border border-gray-600">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#6D4C41]">Warrants issued against a user</h1>

        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4">
          <input
            type="text"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
            placeholder="Enter Aadhaar Number"
            className="border border-gray-600 p-3 rounded mb-4 sm:mb-0 sm:flex-1"
          />
          <button
            onClick={fetchWarrantData}
            className="bg-[#6D4C41] text-white p-3 rounded sm:w-auto w-full hover:bg-[#3E2723]"
          >
            Fetch Warrant
          </button>
        </div>

        {loading && <p className="text-gray-600 text-center">Loading...</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}

        {warrantData && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-600 divide-y divide-gray-600">
              <thead className="bg-[#FFECB3]">
                <tr>
                  <th className="border-b p-3 text-left text-sm font-semibold">Warrant No</th>
                  <th className="border-b p-3 text-left text-sm font-semibold">Warrant Type</th>
                  <th className="border-b p-3 text-left text-sm font-semibold">Accused Name</th>
                  <th className="border-b p-3 text-left text-sm font-semibold">Aadhar No</th>
                  <th className="border-b p-3 text-left text-sm font-semibold">Details</th>
                  <th className="border-b p-3 text-left text-sm font-semibold">Pincode</th>
                  <th className="border-b p-3 text-left text-sm font-semibold">Status</th>
                  <th className="border-b p-3 text-left text-sm font-semibold">Address</th>
                  <th className="border-b p-3 text-left text-sm font-semibold">Issue Date</th>
                </tr>
              </thead>
              <tbody className='text-[#6D4C41]'>
                <tr>
                  <td className="border-b p-3 text-sm">{warrantData.warrantNo}</td>
                  <td className="border-b p-3 text-sm">{warrantData.warrantType}</td>
                  <td className="border-b p-3 text-sm">{warrantData.accusedName}</td>
                  <td className="border-b p-3 text-sm">{warrantData.aadharNo}</td>
                  <td className="border-b p-3 text-sm">{warrantData.details}</td>
                  <td className="border-b p-3 text-sm">{warrantData.pincode}</td>
                  <td className="border-b p-3 text-sm">{warrantData.status}</td>
                  <td className="border-b p-3 text-sm">{warrantData.address}</td>
                  <td className="border-b p-3 text-sm">
                    {new Date(warrantData.issueDate).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {!warrantData && !loading && !error && (
          <p className="text-center text-gray-700">No warrant data found for the provided Aadhaar number.</p>
        )}
      </div>
    </div>
  );
}
