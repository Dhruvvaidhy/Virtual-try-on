import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactPage from './components/ContactPage';
import VirtualFitTool from './components/VirtualFitTool';
import Signup from './components/Signup';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          dispatch(setUser(result.user));
        }
      } catch (error) {
        console.error("Error during redirect:", error);
      }
    };
    handleRedirect();
  }, [dispatch]);
  
  return (
   <Router>
      <Navbar/>
      
      <Routes>
       
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/virtual" element={<VirtualFitTool/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<ErrorPage/>} />

      </Routes>
   </Router>   
    
  )
}

export default App
