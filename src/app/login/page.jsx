'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      const res = await response.json();
      const { role, name } = res.user;

      localStorage.setItem("name", name);
      localStorage.setItem("role", role);

      const dashboardRoutes = {
        1: "/User_Dashboard",        // CITIZEN
        2: "/Lawyer_Dashboard",     // LAWYER
        3: "/Police_Dashboard",     // POLICE
        4: "/Admin_Dashboard",      // JUDGE
        5: "/Superuser_Dashboard",  // SUPERUSER
      };

      router.push(dashboardRoutes[role] || "/");
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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

      <div className="w-1/2 flex justify-center">
        <img
          src="/WarrantBuddy.png" // Replace with your image path
          alt="Login Image"

          className="w-[450px] object-cover rounded-xl shadow-md"
        />
      </div>

      <div className="w-1/2 flex justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[380px] h-[450px]">
          <h2 className="text-2xl font-extrabold mb-6 text-center text-[#6D4C41]">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-[#6D4C41] mb-2">
                Email ID
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-[#6D4C41] rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-[#6D4C41] mb-2">
                Password
              </label>
              <input
          type={showPassword ? "text" : "password"} // Toggle between text and password type
          id="password"
          className="w-full p-3 border border-[#6D4C41] rounded-md pr-10" // Added padding to the right for the button
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full bg-[#6D4C41] text-white p-3 rounded-md hover:bg-[#5A3A35] font-bold"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>

      
    </div>
  );
}

export default Page;
