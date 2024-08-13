'use client';
import { useState } from 'react';

export default function CreateWarrant({ userRole }) {
  const [formData, setFormData] = useState({
    warrantNo: '',
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

    const { warrantNo, warrantType, accusedName, aadharNo, details, pincode, policeStationId, address } = formData;
    if (!warrantNo || !warrantType || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
      setError('All fields are required.');
      window.alert('All fields are required.'); // Show alert with error message
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
          warrantNo: '',
          warrantType: '',
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
        window.alert(data.message || 'Something went wrong.'); // Show alert with error message
      }
    } catch (err) {
      console.error('Error creating warrant:', err);
      setError('Server error, please try again later.');
      window.alert('Server error, please try again later.'); // Show alert with error message
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
        {error && window.alert(error)}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-3">
            <div>
              <label htmlFor="warrantNo" className="block text-sm font-medium text-gray-700">Warrant Number</label>
              <input
                id="warrantNo"
                name="warrantNo"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Warrant Number"
                value={formData.warrantNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="warrantType" className="block text-sm font-medium text-gray-700">Warrant Type</label>
              <input
                id="warrantType"
                name="warrantType"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Warrant Type"
                value={formData.warrantType}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="accusedName" className="block text-sm font-medium text-gray-700">Accused Name</label>
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
              <label htmlFor="aadharNo" className="block text-sm font-medium text-gray-700">Aadhar Number</label>
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
              <label htmlFor="details" className="block text-sm font-medium text-gray-700">Details</label>
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
              <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
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
              <label htmlFor="policeStationId" className="block text-sm font-medium text-gray-700">Police Station ID</label>
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
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
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
