'use client';
import { useState } from 'react';

export default function CreateWarrant() {
  const [formData, setFormData] = useState({
    warrantType: '',
    accusedName: '',
    aadharNo: '',
    details: '',
    pincode: '',
    policeStationId: '',
    address: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { warrantType, accusedName, aadharNo, details, pincode, policeStationId, address } = formData;

    if (!warrantType || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/create/warrant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Warrant created successfully!');
        setFormData({
          warrantType: '',
          accusedName: '',
          aadharNo: '',
          details: '',
          pincode: '',
          policeStationId: '',
          address: '',
        });
        setError(''); // Clear any existing error messages
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error creating warrant:', err);
      setError('Server error, please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4 sm:px-2 lg:px-4">
      <div className="max-w-md w-full space-y-5">
        <div>
          <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
            Create a Warrant
          </h2>
        </div>
        {/* Display error if it exists */}
        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            {[ 
              { id: 'warrantType', label: 'Warrant Type' },
              { id: 'accusedName', label: 'Accused Name' },
              { id: 'aadharNo', label: 'Aadhar Number' },
              { id: 'details', label: 'Details' },
              { id: 'pincode', label: 'Pincode' },
              { id: 'policeStationId', label: 'Police Station ID' },
              { id: 'address', label: 'Address' },
            ].map(({ id, label }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id={id}
                  name={id}
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={label}
                  value={formData[id]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Warrant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
