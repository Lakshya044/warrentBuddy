'use client';
import { useState } from 'react';

export default function ApproveBail() {
  const [formData, setFormData] = useState({
    policeStationId: '',
    aadharNo: '',
    approvalStatus: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    const { policeStationId, aadharNo, approvalStatus } = formData;
    if (!policeStationId || !aadharNo || !approvalStatus) {
      setError('All fields are required.');
      return;
    }

    // Submit the form data to your API
    try {
      const response = await fetch('/api/create/bailapprove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess('Bail approval status updated successfully!');
        // Clear form data
        setFormData({
          policeStationId: '',
          aadharNo: '',
          approvalStatus: '',
        });
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error approving bail:', err);
      setError('Server error, please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center">Approve Bail</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="policeStationId" className="block text-gray-700 font-medium">
                Police Station ID
              </label>
              <input
                id="policeStationId"
                name="policeStationId"
                type="text"
                required
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Police Station ID"
                value={formData.policeStationId}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="aadharNo" className="block text-gray-700 font-medium">
                Aadhar Number
              </label>
              <input
                id="aadharNo"
                name="aadharNo"
                type="text"
                required
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter Aadhar Number"
                value={formData.aadharNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="approvalStatus" className="block text-gray-700 font-medium">
                Approval Status
              </label>
              <select
                id="approvalStatus"
                name="approvalStatus"
                required
                className="appearance-none rounded-md block w-full px-4 py-3 border border-gray-300 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.approvalStatus}
                onChange={handleChange}
              >
                <option value="">Select Approval Status</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
