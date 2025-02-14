import React from 'react'
import LandingPage from './LandingPage'
import Talk from './Talk'
import Details from './Details'
import Footer from './Footer'


const Home = () => {
  return (
    <>
   
    <div className="relative min-h-screen bg-black text-white">
      
      <LandingPage/>
      <Details/>
      <Talk/>
      <Footer/>
    </div>
    </>
  )
}

export default Home;
