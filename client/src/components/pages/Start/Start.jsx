import React from 'react'
import './Start.css'
import {Link} from 'react-router-dom'

const Start = () => {
  return (
    <div className='custom-1 flex items-center justify-start mx-6 h-full'>
      <div>
        <h1 className='text-white text-2xl tracking-wider'>YOUR JOURNEY TO AUTOMATED FITNESS</h1>
        <h2 className='text-3xl tracking-wide font-bold'>STARTS NOW</h2>
        <Link to='/Authentication'><button>GET STARTED</button></Link>
      </div>
    </div>
  )
}

export default Start
