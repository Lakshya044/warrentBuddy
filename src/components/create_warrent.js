'use client';
import { useState } from 'react';
// import { useRouter } from 'next/router';

export default function CreateWarrant({ userRole }) {
  // const router = useRouter();
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

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    

    // Ensure all fields are filled
    const { warrantNo, warrantType, accusedName, aadharNo, details, pincode, policeStationId, address } = formData;
    if (!warrantNo || !warrantType || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
      setError('All fields are required.');
      return;
    }

    // Submit the form data to your API
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
      }
    } catch (err) {
      console.error('Error creating warrant:', err);
      setError('Server error, please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a Warrant
          </h2>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="warrantNo" className="sr-only">Warrant Number</label>
              <input
                id="warrantNo"
                name="warrantNo"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Warrant Number"
                value={formData.warrantNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="warrantType" className="sr-only">Warrant Type</label>
              <input
                id="warrantType"
                name="warrantType"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Warrant Type"
                value={formData.warrantType}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="accusedName" className="sr-only">Accused Name</label>
              <input
                id="accusedName"
                name="accusedName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Accused Name"
                value={formData.accusedName}
                onChange={handleChange}
              />
            </div>
            <div>
  <label htmlFor="aadharNo" className="sr-only">Aadhar Number</label>
  <input
    id="aadharNo"
    name="aadharNo"
    type="text"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="Aadhar Number"
    value={formData.aadharNo}
    onChange={handleChange}
  />
</div>

<div>
  <label htmlFor="details" className="sr-only">Details</label>
  <input
    id="details"
    name="details"
    type="text"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="Details"
    value={formData.details}
    onChange={handleChange}
  />
</div>

<div>
  <label htmlFor="pincode" className="sr-only">Pincode</label>
  <input
    id="pincode"
    name="pincode"
    type="text"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="Pincode"
    value={formData.pincode}
    onChange={handleChange}
  />
</div>

<div>
  <label htmlFor="policeStationId" className="sr-only">Police Station ID</label>
  <input
    id="policeStationId"
    name="policeStationId"
    type="text"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
    placeholder="Police Station ID"
    value={formData.policeStationId}
    onChange={handleChange}
  />
</div>

<div>
  <label htmlFor="address" className="sr-only">Address</label>
  <input
    id="address"
    name="address"
    type="text"
    required
    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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

// Server-side logic for role-based access
export const getServerSideProps = async (context) => {
  const { req } = context;

  // Simulate getting user information from the request

};
