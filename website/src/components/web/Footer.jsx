import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 text-center md:text-left md:grid-cols-4">

        {/* Logo and Description */}
        <div>
          <h2 className="text-white text-lg font-semibold flex items-center justify-center md:justify-start gap-2">
            <img src="/Images/niramayalogo.png" alt="Logo" className="h-9 mr-2" />
          </h2>
          <p className="mt-2 text-sm max-w-xs mx-auto md:mx-0">
            Providing quality healthcare services for women and children.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/mother-child-care/about-us" target="_blank" rel="noopener noreferrer" className="hover:text-white">About Us</Link></li>
            <li><Link href="/mother-child-care/contact-us" target="_blank" rel="noopener noreferrer" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-semibold mb-2">Services</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/services/pediatric-care" target="_blank" rel="noopener noreferrer" className="hover:text-white">Pediatric Care</Link></li>
            <li><Link href="/services/women-health" target="_blank" rel="noopener noreferrer" className="hover:text-white">Women’s Health</Link></li>
            <li><Link href="/services/vaccinations" target="_blank" rel="noopener noreferrer" className="hover:text-white">Vaccinations</Link></li>
            <li><Link href="/services/online-consultation" target="_blank" rel="noopener noreferrer" className="hover:text-white">Online Consultation</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-white font-semibold mb-2">Connect With Us</h3>
          <div className="flex justify-center md:justify-start gap-6 mt-3 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-6 border-t border-gray-700 pt-4">
        &copy; {currentYear} Niramaya Mother And Child Care. All rights reserved.
      </div>
    </footer>
  );
}
