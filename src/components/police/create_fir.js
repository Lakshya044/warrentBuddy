'use client';
import { useState } from 'react';

export default function CreateFir() {
  const [formData, setFormData] = useState({
    firNo: '',
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

    const { firNo, accusedName, aadharNo, details, pincode, policeStationId, address } = formData;
    if (!firNo || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
      setError('All fields are required.');
      alert('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/create/FIR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('FIR created successfully!');
        setFormData({
          firNo: '',
          accusedName: '',
          aadharNo: '',
          details: '',
          pincode: '',
          policeStationId: '',
          address: '',
        });
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
        alert(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error creating FIR:', err);
      setError('Server error, please try again later.');
      alert('Server error, please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create an FIR
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label htmlFor="firNo" className="block text-sm font-medium text-gray-700">
                  FIR Number
                </label>
                <input
                  id="firNo"
                  name="firNo"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="FIR Number"
                  value={formData.firNo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="accusedName" className="block text-sm font-medium text-gray-700">
                  Accused Name
                </label>
                <input
                  id="accusedName"
                  name="accusedName"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Accused Name"
                  value={formData.accusedName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="aadharNo" className="block text-sm font-medium text-gray-700">
                  Aadhar Number
                </label>
                <input
                  id="aadharNo"
                  name="aadharNo"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Aadhar Number"
                  value={formData.aadharNo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                  Details
                </label>
                <input
                  id="details"
                  name="details"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Details"
                  value={formData.details}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  id="pincode"
                  name="pincode"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="policeStationId" className="block text-sm font-medium text-gray-700">
                  Police Station ID
                </label>
                <input
                  id="policeStationId"
                  name="policeStationId"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Police Station ID"
                  value={formData.policeStationId}
                  onChange={handleChange}
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create FIR
            </button>
          </div>
        </form>
        {error && (
          <div className="mt-6 text-center text-red-500">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
