"use client"; // Ensure this component is a Client Component
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitch, FaTwitter } from "react-icons/fa";

import Image from 'next/image'; 

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth', // Optional smooth scrolling animation
  });
};

function Footer() {
  return (
    <div className="container mx-auto p-6">
      <footer className="flex flex-wrap justify-between items-center py-6 border-t border-gray-300">
        <div className="flex items-center">
          <a
            href="#"
            className="p-0 text-gray-600 hover:text-gray-900"
            onClick={scrollToTop} // Call scrollToTop function when clicked
          >
            <Image
              src="/warrantBuddy.jpg"
              width={150} // Adjusted width for responsive design
              height={100} // Adjusted height for responsive design
              alt="Warrant Buddy"
              className="inline-block"
            />
          </a>
          <span className="ml-4 text-gray-600">© 2024 Company, Inc</span>
        </div>

        <ul className="flex justify-end space-x-6">
          <li>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              <FaTwitter className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              <FaInstagram className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a className="text-gray-600 hover:text-gray-900" href="#">
              <FaLinkedin className="h-6 w-6" />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default Footer;
