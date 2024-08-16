"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [id, setId] = useState(""); // This will be either policeId or judgeId
  const [isJudge, setIsJudge] = useState(true);
  const router = useRouter();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleRoleChange = (event) => {
    setIsJudge(event.target.value === "judge");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = isJudge
      ? { judgeId: id, email }
      : { policeId: id, email };

    const endpoint = isJudge ? "/api/auth/login/judge" : "/api/auth/login/police";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const res = await response.json();

      if (response.ok) {
        const dashboardPath = isJudge ? "/Admin_Dashboard" : "/Police_Dashboard";
        router.push(dashboardPath);
      } else {
        alert("Invalid email or ID");
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
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="id" className="block text-gray-700 font-medium mb-2">
              {isJudge ? "Judge ID" : "Police ID"}
            </label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={handleIdChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-500"
              placeholder={`Enter your ${isJudge ? "Judge ID" : "Police ID"}`}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Login as:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="role-judge"
                name="role"
                value="judge"
                checked={isJudge}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label htmlFor="role-judge" className="text-gray-700">
                Judge
              </label>
            </div>
            <div className="flex items-center mt-2">
              <input
                type="radio"
                id="role-police"
                name="role"
                value="police"
                checked={!isJudge}
                onChange={handleRoleChange}
                className="mr-2"
              />
              <label htmlFor="role-police" className="text-gray-700">
                Police
              </label>
            </div>
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
