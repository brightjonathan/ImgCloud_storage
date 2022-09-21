import React, { useEffect } from 'react'
import SecondHookStorage from './SecondHookStorage'

const ProgressBar = ( {file, setfile} ) => {


    const {progress, url} = SecondHookStorage(file)

    //
    useEffect(()=>{
      if(url){
        setfile('')
      }
    }, [url, setfile])

  return (
    <div className='progress-bar' style={{width: progress + '%' }}></div>
  )
}

export default ProgressBar
