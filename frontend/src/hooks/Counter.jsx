//HOOKS ARE FUNCTION THAT ALLOW YOU TO USE REACT STATE AND LIFECYCLE FEATURED IN FUNCTIONAL COMPONENTS

//1. SIMPLIFIED CODE
//2. REUSABILITY
//3.FUNCTIONAL PARADIGM

//useState()--manages state in functional components
//returns an array with the state value(variable) and a setter function

import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  let [dark, setDark] = useState(false);

  const theme = ()=>{
    if(dark){
        document.body.style.backgroundColor = 'white';
    }
    else{
        document.body.style.backgroundColor = 'black'
    };

    dark = !dark;
  }

  return (
    <div style={{ color: "seagreen", marginTop: "50px" }}>
      Counter
      <div>
        <p>You clicked {count} times</p>

        <div style={{display:"flex", gap: '2em'}}>
          <button
            onClick={() => setCount(count + true)}
            style={{ marginLeft: "20px" }}
          >
            click
          </button>

          <button onClick={()=> setDark((document.body.style.backgroundColor = dark ? 'white' : 'black', !dark))} style={{padding: "12px 18px"}}>click</button>

          <button onClick={()=> setDark(theme())}>click</button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
