import React from 'react';
import { useAuth } from '../../Hook/useAuth';
import Logo from '../../assets/Logo';
import { Link } from 'react-router';

const Navbar = () => {
  // const {user} = useAuth() || []
  const user =true
  return (
    <div className='max-w-[80%] mx-auto'>
    <div className="navbar bg-base-100 ">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to="/">Home</Link></li>
        <li><a>Challenges</a></li>
      
        <li><a>My Activities</a></li>
      </ul>
    </div>
    <div className='flex items-center ml-2'>
       <div className='hidden md:block'><Logo></Logo></div>
    <a className="
     text-xl">
       <Link className='text-2xl text-green-400 ml-1'>EcoTrack</Link>
    </a>
    </div>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a>Home</a></li>
      <li><a>Challenges </a></li>
  
      <li><a>My Activities</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    {
      user ? <div className="dropdown">
  <div tabIndex={0} role="button" className="btn m-1">
     <img src="https://i.ibb.co/gbYs5Gjh/eco-friendly.png" alt="logo" className='w-6 h-6'/>
    <span>EcoTruck</span>
    
    </div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <li><a>Profile</a></li>
    <li><a>My Activities</a></li>
     <li><a>Logout</a></li>
  </ul>
</div>:<>
<Link to="/login" className="btn mr-2">Login</Link>
<Link to="/register" className="btn">Register</Link>
</>
    }
    
  </div>
</div>
    </div>
  );
};

export default Navbar;