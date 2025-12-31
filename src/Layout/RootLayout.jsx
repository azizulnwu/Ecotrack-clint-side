
import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
  return (
  <div>
      <Navbar />
      <div className='pt-24 min-h-[calc(100vh-68px)]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;