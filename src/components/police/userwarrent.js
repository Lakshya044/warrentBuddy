'use client';
import { useState } from 'react';

export default function UserWarrant() {
  const [formData, setFormData] = useState({
    warrantNo: '',
    warrantType: '',
    accusedName: '',
    aadharNo: '',
    details: '',
    pincode: '',
    status: '',
    address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { warrantNo, warrantType, accusedName, aadharNo, details, pincode, status, address } = formData;
    if (!warrantNo || !warrantType || !accusedName || !aadharNo || !details || !pincode || !status || !address) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('/api/create/userwarrant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Warrant created successfully!');
        setFormData({
          warrantNo: '',
          warrantType: '',
          accusedName: '',
          aadharNo: '',
          details: '',
          pincode: '',
          status: '',
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
    <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4 sm:px-6 lg:px-8 bg-gray-200">
      <div className="w-full max-w-md space-y-8 bg-gray-100 p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Create User Warrant</h2>
        </div>
        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {[
              { id: 'warrantNo', label: 'Warrant Number' },
              { id: 'warrantType', label: 'Warrant Type' },
              { id: 'accusedName', label: 'Accused Name' },
              { id: 'aadharNo', label: 'Aadhar Number' },
              { id: 'details', label: 'Details' },
              { id: 'pincode', label: 'Pincode' },
              { id: 'status', label: 'Status' },
              { id: 'address', label: 'Address' }
            ].map(({ id, label }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
                <input
                  id={id}
                  name={id}
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm bg-gray-50 text-gray-900"
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Create Warrant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
