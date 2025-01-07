'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    country: "",
    address: "",
    city: "",
    pincode: "",
    phonenumber: "",
    role : 1 ,
  });
    const [showPassword, setShowPassword] = useState(false);
      const [loading, setLoading] = useState(false);
  
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/login");
      } else {
        alert("Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally{
      setLoading(false) ;
    }
  };

  return (
    <div
      className="flex justify-between items-center min-h-screen"
      style={{
        background:
          "radial-gradient(circle,rgba(253, 248, 225, 1)  5%, rgba(109, 76, 65, 1) 81%)",
      }}
    >
      <div className="w-6/10 flex justify-center mx-20">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[580px]">
          <h2 className="text-2xl font-extrabold mb-6 text-center text-[#6D4C41]">Register</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="name" className="block text-[#6D4C41] mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[#6D4C41] mb-2">Email ID</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className='relative'>
                <label htmlFor="password" className="block text-[#6D4C41] mb-2">Password</label>
                <input
                  type={showPassword ? "text" : "password"} 
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
                <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 mt-6 transform -translate-y-1/2 text-[#6D4C41] hover:text-[#3E2723] focus:outline-none"
        >
          {showPassword ? "Hide" : "Show"} {/* Button text toggle */}
        </button>
              </div>
              <div>
                <label htmlFor="country" className="block text-[#6D4C41] mb-2">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="address" className="block text-[#6D4C41] mb-2">Address</label>
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
              <div>
                <label htmlFor="city" className="block text-[#6D4C41] mb-2">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full p-3 border border-[#6D4C41] rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="pincode" className="block text-[#6D4C41] mb-2">Pincode</label>
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
                <label htmlFor="phonenumber" className="block text-[#6D4C41] mb-2">Phone Number</label>
                <input
                  type="text"
                  id="phonenumber"
                  name="phonenumber"
                  value={formData.phonenumber}
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
                {loading ? "Registering User..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-4/10 flex justify-center mx-20">
        <img
          src="/WarrantBuddy.png" // Replace with your image path
          alt="Register Image"
          className="w-[450px] object-cover rounded-xl shadow-md"
        />
      </div>
    </div>
  );
}

export default Page;