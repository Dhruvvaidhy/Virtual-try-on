import React from 'react'
import Header from './LandingPage'
import Talk from './Talk'
import Details from './Details'
import Footer from './Footer'


const Home = () => {
  return (
    <>
   
    <div className="relative min-h-screen bg-black text-white">
      
      <Header/>
      <Details/>
      <Talk/>
      <Footer/>
    </div>
    </>
  )
}

export default Home;
