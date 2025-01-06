'use client'
import React from 'react'
import { useState } from 'react';
import { useRouter } from "next/navigation";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send login request to server
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const res = await response.json();

    if (response.ok) {
      const userRole = res?.role;
      let dashboardPath;

      switch (userRole) {
        case 1:
          dashboardPath = "/User_Dashboard";
          break;
        case 2: // LAWYER
          dashboardPath = "/Lawyer_Dashboard";
          break;
        case 3: // POLICE
          dashboardPath = "/Police_Dashboard";
          break;
        case 4: // JUDGE
          dashboardPath = "/Admin_Dashboard";
          break;
        case 5: // SUPERUSER
          dashboardPath = "/Superuser_Dashboard";
          break;
        default:
          alert("Unknown role. Please try again.");
          return;
      }

      router.push(dashboardPath);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default page
