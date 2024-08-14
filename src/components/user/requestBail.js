'use client';
import { useState } from 'react';

export default function RequestBail() {
  const [formData, setFormData] = useState({
    aadharNo: '',
    accusedName: '',
    pincode: '',
    details: '',
    policeStationId: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { aadharNo, accusedName, pincode, details, policeStationId, address } = formData;
    if (!aadharNo || !accusedName || !pincode || !details || !policeStationId || !address) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/fetch/requestbail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Bail request submitted successfully!');
        setFormData({
          aadharNo: '',
          accusedName: '',
          pincode: '',
          details: '',
          policeStationId: '',
          address: '',
        });
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error submitting bail request:', err);
      setError('Server error, please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Request Bail</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {[
            { id: 'aadharNo', label: 'Aadhar Number' },
            { id: 'accusedName', label: 'Accused Name' },
            { id: 'pincode', label: 'Pincode' },
            { id: 'details', label: 'Details' },
            { id: 'policeStationId', label: 'Police Station ID' },
            { id: 'address', label: 'Address' },
          ].map(({ id, label }) => (
            <div key={id} className="flex flex-col">
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
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
