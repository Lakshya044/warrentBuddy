'use client';
import Image from 'next/image';
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
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true) ;

    const { aadharNo, accusedName, pincode, details, policeStationId, address } = formData;
    if (!aadharNo || !accusedName || !pincode || !details || !policeStationId || !address) {
      setError('All fields are required.');
      setLoading(false) ;
      return;
    }

    try {
      const response = await fetch('/api/create/request_bail', {
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
    }finally{
        setLoading(false) ; 
    }
  };

  return (
    <div
      className="flex justify-between items-center h-[700px]"
      style={{
        background:
          "radial-gradient(circle, rgba(253, 248, 225, 1) 5%, rgba(109, 76, 65, 1) 81%)",
      }}
    >
      <div className="w-6/10 flex justify-center mx-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[580px]">
          <h2 className="text-2xl font-extrabold mb-6 text-center text-[#6D4C41]">
            Request Bail
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 border border-green-300 rounded p-4 mb-4">
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="aadharNo" className="block text-[#6D4C41] mb-2">
                  Aadhar Number
                </label>
                <input
                  id="aadharNo"
                  name="aadharNo"
                  type="text"
                  value={formData.aadharNo}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="accusedName" className="block text-[#6D4C41] mb-2">
                  Accused Name
                </label>
                <input
                  id="accusedName"
                  name="accusedName"
                  type="text"
                  value={formData.accusedName}
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
                  id="pincode"
                  name="pincode"
                  type="text"
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
                  id="policeStationId"
                  name="policeStationId"
                  type="text"
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
                  id="details"
                  name="details"
                  type="text"
                  value={formData.details}
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
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
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
                {loading ? "Submitting Request" : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-4/10 flex justify-center mx-20">
        <Image
          src="/WarrantBuddy.png"
          alt="Request Bail"
          width={450}
          height={450}
          className="object-cover rounded-xl shadow-md"
        />
      </div>
    </div>
  );
}
