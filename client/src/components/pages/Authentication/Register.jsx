import React, { useState } from 'react';
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'


const Register = ({ toggleForm }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post('http://localhost:8000/api/users/register', formData);
      
      if(data.error){
        toast.error(data.error)
      } else{
        setFormData({});
        navigate('/login')
        toast.success("Register Successful")
        setFormData({
          username: '',
          password: ''
        })
      }

    } catch (error) {
      console.log("Server error on register")
    }    

  }
    


  

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='px-1/3 '>
        <div className='main-form'>
          <div className='main-form-title'>
            <h2>Register</h2>
          </div>
          <form>
            <div className='main-form-inputs'>
              <input type='text' value={formData.username} onChange={handleChange} name='username' placeholder='Username'></input>
              <input value={formData.password} type='password' onChange={handleChange} name='password' placeholder='Password'></input>
              <input type='password' onChange={handleChange} name='repeatpassword' placeholder='Confirm Password'></input>
              <button onClick={registerHandler}>Register</button>
            </div>
          </form>
          <div className='create-acc-button mt-4'>
            <button onClick={toggleForm} className='text-xs'>ALREADY HAVE AN ACCOUNT? LOG IN</button>
          </div> 
        </div>
      </div>
    </div>
  );
};

export default Register;
