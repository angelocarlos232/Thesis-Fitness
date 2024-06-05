import React, { useState } from 'react'
import './Dashboard.css'
import { useEffect } from 'react'
import DashRoutine from './DashRoutine'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'



const Dashboard = () => {
    const mealsData = "4/6 meals done"
    const sleepData = "5hrs sleep"
    const { userId } = useParams();
    
    const {currentUser} = useSelector(state => state.user)

    const navigate = useNavigate();
    

  const startButton = () => {
    window.location.href = 'http://localhost:3000/start/' + userId;  }
    
    
  return (
    <div className='mx-3 my-3'>
        <div>
        <div className="minor-details">
            <div className="column">
                <div className='ml-3'>
                        <h2 className='font-bold'>Exercises today:</h2>
                            <p className='overflow-hidden'></p> 
                </div>     
            </div>
                <div className="column">
                    <div className='ml-3'>
                        <h2 className='font-bold'>Meals:</h2>
                        <p>{mealsData}</p>
                    </div>
                </div>
                <div className="column">
                    <div className='ml-3'>
                        <h2 className='font-bold'>Sleep:</h2>
                        <p>{sleepData}</p>
                    </div>
                </div>
            <div className='column-button ml-3'>
                <button onClick={startButton}>START</button>
            </div>
        </div>

        <div>
            <DashRoutine />
        </div>
        
        
        
        </div>
    </div>
  )
}

export default Dashboard
