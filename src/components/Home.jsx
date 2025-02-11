import React from 'react'
import Header from './LandingPage'
import Talk from './Talk'
import Details from './Details'


const Home = () => {
  return (
    
    <div className="min-h-screen bg-black text-white">
      
      <Header/>
      <Details/>
      <Talk/>
    </div>
  )
}

export default Home;
