import React from 'react';
import Logo from '../../assets/Logo';
import { Link } from 'react-router';
import BrandLogo from '../../Components/Shared/BrandLogo';

const Register = () => {
  return (
    <div className='max-w-[80%] mx-auto'>
      <h1>Register form</h1>
     <Link to="/"><BrandLogo></BrandLogo></Link>
    </div>
  );
};

export default Register;