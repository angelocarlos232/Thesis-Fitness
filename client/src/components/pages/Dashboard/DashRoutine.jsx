import React from 'react'
import { useSelector } from 'react-redux';


const DashRoutine = () => {

  // const sampletext = "here is from database";
  const {currentUser} = useSelector(state => state.user)

  const overviewItems = currentUser.overview ? Object.entries(currentUser.overview).map(([key, value]) => (
    <div key={key}>
      <p>{`${key}: ${value}`}</p>
    </div>
  )) : null;


  return (
    <div className='w-full'>
      <div className='dash-contents'>
        <div className='dash-1'>
            <div>
                <p className='text-sm'>Workout Routine Recommendation:</p>
            </div>
            <div>
              
              {overviewItems ? <></> : <></>}
            </div>
        
        
        
        </div>


        <div className='dash-2'>
            <div className='dash-2-1'>
                <div><p className='text-sm'>Progress Chart:</p></div>
            </div>
            <div className='dash-2-2'>
                <div><p className='text-sm'>Recommended Diet:</p></div>

            </div>
        </div>
        
      </div>
    </div>
  )
}

export default DashRoutine
