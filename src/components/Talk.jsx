import React from "react";
import { Link } from "react-router-dom";

const Talk = () => {
  return (
    <div className="h-78 bg-black flex flex-col items-center justify-center">
      {/* Title */}
      <h1 className="text-white text-4xl font-bold mb-6">Let’s Talk</h1>
      
      {/* Contact Button */}
      <Link to="/contact">
        <button className="bg-[#ef4a60] cursor-pointer text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-black">
          CONTACT
        </button>
      </Link>
    </div>
  );
};

export default Talk;

