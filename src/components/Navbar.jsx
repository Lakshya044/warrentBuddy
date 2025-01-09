'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Image from 'next/image';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [runCount, setRunCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (runCount >= 1000) {
        clearInterval(intervalId); // Stop the interval once runCount hits 50
        return;
      }

      try {
        const response = await fetch('/api/cookies');
        const data = await response.json();

        // console.log(`Iteration ${runCount + 1}`);
        // console.log('Token:', data.token);
        // console.log('Name:', data.name);
        // console.log('Role:', data.role);

        if (data.token && data.name) {
          setIsLoggedIn(true);
          setUsername(data.name);
        } else {
          setIsLoggedIn(false);
          setUsername("");
        }

        setRunCount((prevCount) => prevCount + 1); 
      } catch (error) {
        console.error(`Error in iteration ${runCount + 1}:`, error);
      }
    }, 500); // Run every 500ms

    return () => clearInterval(intervalId); 
  }, [runCount]);
  

  const handleLogoutClick = async () => {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    if (res.ok) {
      
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "name=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      setIsLoggedIn(false);
      setUsername("");
      router.push("/"); 
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <nav className="relative flex items-center p-1 border-b border-gray-200 bg-[#FDF8E1]">
  {/* Left Section */}
  <div className="flex items-center">
    <span className="m-2">
      <Image
        src="/WarrantBuddy.png"
        className="rounded-2xl border-2 border-[#3E2723]"
        alt="My Image"
        width={70}
        height={70}
      />
    </span>
    <span className="text-[#6c3929] flex flex-col items-center mx-4">
      <div className="text-4xl font-extrabold text-[#6D4C41] drop-shadow-[2px_2px_0px_#3E2723] bg-clip-text text-transparent bg-gradient-to-r from-[#8B5A2B] via-[#6D4C41] to-[#3E2723]">Warrant Buddy</div>
      <div className="text-m font-bold ml-[-15px]">Legal Document Management</div>
    </span>
  </div>

  {/* Center Section */}
  {isLoggedIn && (
    <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl font-extrabold text-[#6D4C41] ">
      Welcome, {username}
    </div>
  )}

  {/* Right Section */}
  <div className="flex ml-auto">
    {isLoggedIn ? (
      <button
        className="px-4 py-2 text-sm font-bold bg-[#6D4C41] text-[#FDF8E1] rounded-md hover:bg-[#5A3A35]"
        onClick={handleLogoutClick}
      >
        LOG OUT
      </button>
    ) : (
      <div className="space-x-4">
        <button
          className="px-4 py-2 text-sm border border-[#3E2723] rounded-md font-bold bg-[#FFB300] text-[#3E2723] hover:bg-[#E6A000]"
          onClick={() => router.push("/signup")}
        >
          SIGN UP
        </button>
        <button
          className="px-4 py-2 text-sm bg-[#FFB300] border-[#3E2723] text-[#3E2723] font-bold rounded-md hover:bg-[#E6A000]"
          onClick={() => router.push("/login")}
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
