import React from 'react'

import {useMemo, useState} from "react";

//useMemo is a react hook that be used to calculate large amount of data.
//use-case-- it can be to filter large list of data

const List = () => {
    const [search, setSearch] = useState('');

    console.log(search );
    
    const students = [
        "Taiwo",
        "Tunde",
        "Femi",
        "Anjola",
        "Kiki",
        "Praise",
        "Daniel",
        "Lekan",
        "Paul",
        "Tayo"
    ];


    const getSum = (title, price)=>{
        console.log(title);
        
    }
    // let myFilter = students.includes("Taiwo");

    // console.log(myFilter);
    
    // let arr = [1,2,3,4,5,6,7,8,9];

    // let myMaparr = arr.map((items)=> items * 2);
    // console.log(myMaparr);
    

    const filteredStudent = useMemo(()=>{
        // console.log("fetching...")

        return students.filter(student =>
            student.toLowerCase().includes(search.toLowerCase())
        )


    }, [search]);


    getSum("this is sum")
  return (
    <div>

        <input type="text" 
        placeholder="search student"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
        style={{marginLeft:"20px", marginBottom: "20px"}}
        
        />

        {/* <button onClick={()=> setSearch(search)}>search</button> */}

       
        

        {filteredStudent.map((student, index)=> (
            <h1 style={style.h1} key={index}>{student}</h1>
        ))}

    </div>
  )
}

const style = {
   h1:{
     color: "red",
    padding: "10px"
   }
}

export default List