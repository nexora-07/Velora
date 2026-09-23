//useEffect---handles side effects like data fetching,subscriptions or manual Dom manipulation.
//It runs after render and can be controlled with a dependancy array


import React, {useState, useEffect} from 'react'

const Timer = () => {



   



    const [seconds, setSeconds] = useState(0);

    useEffect(()=>{
        const interval = setInterval(()=> setSeconds((s)=> s + 1), 1000);
        // return clearInterval(interval)
    }, [])

    return <p style={{fontSize: '4em'}}>Timer: {seconds} seconds</p>



  
}

export default Timer