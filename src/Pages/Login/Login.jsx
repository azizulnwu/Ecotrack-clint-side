import React from 'react';
import BrandLogo from '../../Components/Shared/BrandLogo';
import { Link } from 'react-router';

const Login = () => {
  return (
    <div className='max-w-[80%] mx-auto'>
      <h1>login form</h1>
     <Link to="/"><BrandLogo></BrandLogo></Link>
    </div>
  );
};

export default Login;