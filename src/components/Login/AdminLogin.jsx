"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function AdminLogin() {
  const [idNumber, setIdNumber] = useState("");
  const router = useRouter();

  const handleIdNumberChange = (event) => {
    setIdNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send a POST request to the server for authentication
    let response;
    try {
      response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idNumber }),
      });
      const res = await response.json();

      if (res.success) {
        // Redirect to the admin dashboard or appropriate page
        router.push("/adminDashboard");
      } else {
        alert("Invalid ID number");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="idNumber" className="block text-gray-700 font-medium mb-2">
              ID Number
            </label>
            <input
              type="text"
              id="idNumber"
              value={idNumber}
              onChange={handleIdNumberChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your ID number"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
