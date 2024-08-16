"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RoleSelectModal from './RoleSelectModel';


function LowerNavbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSignUpClick = () => {
    router.push('/signup');
  };

  const handleLoginClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectRole = (role) => {
    setIsModalOpen(false);
    if (role === 1) {
      router.push('/ClientLogin');
    }else {
      router.push('/AdminLogin');
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center p-2 bg-gray-100 border-t border-gray-200">
        <div className="flex items-center">
          <Image
            src="/preamble.jpg"
            width={70}
            height={70}
            alt="Preamble"
            className="mr-2"
          />
          <Image
            src="/warrantBuddy.jpg"
            width={350}
            height={200}
            alt="WarrantBuddy"
            className="ml-2"
          />
        </div>
        <div>
          <button
            className="px-4 py-2 text-sm border border-gray-400 rounded-md bg-white text-gray-700 hover:bg-gray-200"
            type="button"
            onClick={handleSignUpClick}
          >
            SIGN UP
          </button>
          <button
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
            type="button"
            onClick={handleLoginClick}
          >
            SIGN IN
          </button>
        </div>
      </nav>
      {isModalOpen && (
        <RoleSelectModal onClose={handleCloseModal} onSelectRole={handleSelectRole} />
      )}
    </>
  );
}

export default LowerNavbar;
