"use client"; // Ensure this component is a Client Component
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Optional smooth scrolling animation
  });
};

function Footer() {
  return (
    <footer className="bg-[#FDF8E1] py-8 border-t border-[#6D4C41]">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section: Logo and Copyright */}
        <div className="flex flex-col md:flex-row items-center mb-6 md:mb-0">
          <a
            href="#"
            className="p-0 text-[#6D4C41] hover:text-[#3E2723]"
            onClick={scrollToTop}
          >
            <Image
              src="/warrantBuddy.jpg"
              width={150}
              height={100}
              alt="Warrant Buddy"
              className="inline-block"
            />
          </a>
          <span className="mt-2 md:mt-0 md:ml-4 text-[#6D4C41]">
            © 2024 Company, Inc
          </span>
        </div>

        {/* Right Section: Social Media Links */}
        <ul className="flex justify-center md:justify-end space-x-6 text-[#6D4C41]">
          <li>
            <a
              className="hover:text-[#3E2723]"
              href="#"
              aria-label="Facebook"
            >
              <FaFacebook className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              className="hover:text-[#3E2723]"
              href="#"
              aria-label="Instagram"
            >
              <FaInstagram className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              className="hover:text-[#3E2723]"
              href="#"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
          </li>
          <li>
            <a
              className="hover:text-[#3E2723]"
              href="#"
              aria-label="Twitter"
            >
              <FaTwitter className="h-6 w-6" />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
