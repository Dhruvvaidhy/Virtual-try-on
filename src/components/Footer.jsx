import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import logo from "../assets/logo.png"; // Update the path if needed

const Footer = () => {
  return (
    <footer className="bg-[#171616] text-gray-400 py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo */}
        <div className="mb-3  md:mb-2">
          <img src={logo} alt="Logo" className="h-8 md:h-17" />
        </div>

        {/* Copyright & Links */}
        <div className="text-sm text-center md:text-left">
          © Copyright 2025 <span className="text-white">Virtual-try-on</span> |  
          <a href="/terms" className="hover:text-white mx-2">Terms & Conditions</a> -  
          <a href="/privacy" className="hover:text-white ml-2">Privacy Policy</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="https://www.linkedin.com/in/dhruv-vaidhy-4230552b7/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-gray-400 hover:text-blue-700 text-lg" />
          </a>
          <a href="https://github.com/Dhruvvaidhy" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-gray-400 hover:text-black text-lg" />
          </a>
          <a href="https://www.instagram.com/_dhulu_786?igsh=YWJ1eHpmdmNkdThh" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-gray-400 hover:text-white text-lg" />
          </a>
          <a href="https://www.youtube.com/@RockyGaming_23" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="text-gray-400 hover:text-red-500 text-lg" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
