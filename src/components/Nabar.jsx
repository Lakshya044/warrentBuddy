"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const getCookie = (cookieName) => {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [name, value] = cookies[i].split("=");
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
    return null;
  };

  useEffect(() => {
    let counter = 0; // Initialize counter

    const checkLoginStatus = () => {
      const token = getCookie("token");
      const storedUsername = getCookie("name");

      console.log("Token consoled at Navbar", token);
      console.log("Username consoled at Navbar", storedUsername);

      if (storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      } else {
        setIsLoggedIn(false);
        setUsername("");
      }

      counter++; // Increment counter
      if (counter >= 400) {
        clearInterval(intervalId);
      }
    };

    checkLoginStatus();
    const intervalId = setInterval(checkLoginStatus, 500);

    return () => clearInterval(intervalId);
  }, []);


  const handleSignUpClick = () => {
    router.push("/signup");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleLogoutClick = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });

      if (res.ok) {
        // Clear cookies manually
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        document.cookie = "name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        setIsLoggedIn(false);
        setUsername("");
        router.push("/"); // Redirect to home page
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-2 bg-gray-100 border-b border-gray-200">
      <div className="flex items-center">
        <Image
          src="/tiranga.jpg"
          width={60}
          height={60}
          alt="Preamble"
          className="inline-block align-top rounded-full"
        />
        <div className="ml-2 text-blue-700 font-semibold text-xl">
          <span>GOVERNMENT OF INDIA</span>
        </div>
      </div>
      <div className="flex items-center">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-800">Welcome, {username}</span>
            <button
              className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={handleLogoutClick}
            >
              LOG OUT
            </button>
          </div>
        ) : (
          <div className="space-x-4">
            <button
              className="px-4 py-2 text-sm border border-gray-400 rounded-md bg-white text-gray-700 hover:bg-gray-200"
              onClick={handleSignUpClick}
            >
              SIGN UP
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={handleLoginClick}
            >
              SIGN IN
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
