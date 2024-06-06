import React, { useState, useEffect } from 'react';
import Logo from '../../assets/Logo.png';
import '../menu/Menu.css';
import HomeIcon from '@mui/icons-material/Home';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import PhoneIcon from '@mui/icons-material/Phone';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import { current } from '@reduxjs/toolkit';
import { useParams } from 'react-router-dom';

import axios from 'axios'

const Menu = () => {


  // const usersample = "Juan Dela Cruz";
  const {currentUser} = useSelector(state => state.user)
  const { userId } = useParams();
  



  const handleLogout = async() => {
    console.log("clicked")
    try {
      // Make a GET request to the server-side logout endpoint
      const res = await axios.get('http://localhost:8000/api/users/signout');
      // Check if the logout was successful based on the response
      if (res.data.success === true) {
        console.log("Logout successful");
        localStorage.removeItem('persist:root');
        // Redirect the user to the authentication page or perform any other actions
        window.location.href = '/authentication';
      } else {
        console.log("Logout failed:", res.data.error);
        // Handle logout failure, e.g., show an error message to the user
      }
    } catch (error) {
      console.log("Error during logout:", error);
      // Handle any network or server errors that occur during logout
    }
  };



  return (
    <div>
      <div className='px-3'>
        <div className='menu-container flex-col'>
            

            {currentUser ? (<>
              <div className='logo-part-2-container flex items-center'>
              <div className='logo-part-2'><img src={Logo} alt="Logo"></img></div>
              <div className='flex-col items-center leading-3 ml-2 text-slate-50'>
              <p className='text-l font-medium'>{currentUser ? currentUser.slug : "User"}</p>
              <p className='text-xs'>Data example</p>
              </div></div></>) : 
              (<><div className='logo-part-2-with-user'><img src={Logo} alt="Logo"></img></div></>)}





            </div>
          <div className='menu-part'>
            <ul>
              <li className='flex items-center'>
                <span className="icon-red"><HomeIcon style={{ fontSize: 30 }} /></span>
                <Link to={`/dashboard/${userId}`}>
                  <p className='ml-3'>HOME</p></Link>
              </li>
              <li className='flex items-center'>
                <span className="icon-red"><FitnessCenterIcon style={{ fontSize: 30 }} /></span>
                <Link to={`/workouts/${userId}`}>
                <button><p className='ml-3'>Logs</p></button></Link> 
              </li>
              <li className='flex items-center'>
                <span className="icon-red"><InfoIcon style={{ fontSize: 30 }} /></span>
                <Link to={`/about/${userId}`}><button><p className='ml-3'>About</p></button></Link> 
              </li>
              <li className='flex items-center'>
                <span className="icon-red"><SettingsIcon style={{ fontSize: 30 }} /></span>
                <Link to='/settings'><button><p className='ml-3'>Settings</p></button></Link> 
              </li>
              {currentUser && (
              <li className='flex items-center'>
                <span className="icon-red"><PhoneIcon style={{ fontSize: 30 }} /></span>
                <button onClick={handleLogout}><p className='ml-3'>Logout</p></button>
              </li>
              )}
            </ul>
          </div>
        </div>
      </div>

  )
}

export default Menu;
