'use client';
import Image from 'next/image';
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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { warrantType, accusedName, aadharNo, details, pincode, policeStationId, address } = formData;

    if (!warrantType || !accusedName || !aadharNo || !details || !pincode || !policeStationId || !address) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/create/create_warrant', {
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
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error creating warrant:', err);
      setError('Server error, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-between items-center h-[700px]"
      style={{
        background:
          "radial-gradient(circle,rgba(253, 248, 225, 1) 5%, rgba(109, 76, 65, 1) 81%)",
      }}
    >
      <div className="w-6/10 flex justify-center mx-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[580px]">
          <h2 className="text-2xl font-extrabold mb-6 text-center text-[#6D4C41]">
            Create Warrant
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="warrantType" className="block text-[#6D4C41] mb-2">
                  Warrant Type
                </label>
                <select
                  id="warrantType"
                  name="warrantType"
                  value={formData.warrantType}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                >
                  <option value="">Select Warrant Type</option>
                  <option value="Search Warrant">Search Warrant</option>
                  <option value="Arrest Warrant">Arrest Warrant</option>
                </select>
              </div>
              <div>
                <label htmlFor="accusedName" className="block text-[#6D4C41] mb-2">
                  Accused Name
                </label>
                <input
                  type="text"
                  id="accusedName"
                  name="accusedName"
                  value={formData.accusedName}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="aadharNo" className="block text-[#6D4C41] mb-2">
                  Aadhar Number
                </label>
                <input
                  type="text"
                  id="aadharNo"
                  name="aadharNo"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
              <div>
              <label htmlFor="address" className="block text-[#6D4C41] mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="pincode" className="block text-[#6D4C41] mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="policeStationId" className="block text-[#6D4C41] mb-2">
                  Police Station ID
                </label>
                <input
                  type="text"
                  id="policeStationId"
                  name="policeStationId"
                  value={formData.policeStationId}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label htmlFor="details" className="block text-[#6D4C41] mb-2">
                  Details
                </label>
                <input
                  type="text"
                  id="details"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-[#6D4C41] text-white p-3 rounded-md hover:bg-[#5A3A35] font-bold"
                disabled={loading}
              >
                {loading ? "Creating Warrant..." : "Create Warrant"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-4/10 flex justify-center mx-20">
        <Image
          src="/WarrantBuddy.png"
          alt="Warrant Buddy"
          className="w-[450px] object-cover rounded-xl shadow-md"
        />
      </div>
    </div>
  );
}
