import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import StartPage from './pages/StartPage/StartPage';
import Home from './pages/Home/Home';
import SignIn from './pages/Sign/SignIn';
import { useState, useEffect } from 'react';
import PatientForm from './pages/patient-form/PatientForm';
import Landing from './pages/Landing/Landing';
import LocomotiveScroll from 'locomotive-scroll';
import Doctors from './custom/Doctors';
import Navbar from './components/ui/Navbar';
import Services from './custom/Services';

function App() {
  const [homePage, setHomePage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('CarePlusUserToken')) {
      setHomePage(true);
      setIsAuthenticated(true);
    }
  }, []);

  // Initialize LocomotiveScroll
  useEffect(() => {
    const scroll = new LocomotiveScroll();
    return () => {
      scroll.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      {homePage && <Navbar />}

      <Routes>
        <Route path='/' element={<Landing />} />
        
        {isAuthenticated ? (
          <>
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/services' element={<Services />} />
            <Route path='/patient-form-page' element={<PatientForm />} />
            {/* Redirect authenticated users from SignIn and SignUp to Home */}
            <Route path='/sign-in' element={<Navigate to="/" />} />
            <Route path='/sign-up' element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path='/sign-in' element={<SignIn />} />
            <Route path='/sign-up' element={<StartPage />} />
          </>
        )}

        {/* Redirect any unknown routes to SignIn for non-authenticated users */}
        <Route path='*' element={<Navigate to={isAuthenticated ? "/" : "/sign-in"} />} />
      </Routes>
      
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
