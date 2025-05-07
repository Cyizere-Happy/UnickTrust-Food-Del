import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import NotFound from './pages/404Code/NotFound';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TourGuide from './components/webTourGuide/TourGuide';
import PrivacyPolicy from './pages/Privacy-Policy/privacyPolicy';
import Verify from './pages/Verify/Verify';


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]);

  return null;
};

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      <TourGuide />
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <Navbar setShowLogin={setShowLogin} />
      <div className='app'>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home setShowLogin={setShowLogin} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />}></Route>
          <Route path='/verify' element={<Verify />}></Route>
        </Routes> 
      </div>
      <Footer />
    </>
  );
};

export default App;
