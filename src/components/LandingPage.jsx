import React from 'react'
import bgv from '../assets/bgv.mp4'
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return ( 
    <header className="relative text-center flex flex-col items-center justify-center h-[100vh] overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted 
        > 
          <source src={bgv} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            A New Way to Experience Digital Fashion
          </h1>  
          <div className="flex ">
            <Link to="/virtual">
            <button className="bg-[#ef4a60] cursor-pointer text-white px-8 py-3 text-lg font-semibold rounded-full hover:bg-white hover:text-black">
              Get Started
            </button>
            </Link> 
          </div>   
        </div>
      </header>
  )
}

export default LandingPage;
