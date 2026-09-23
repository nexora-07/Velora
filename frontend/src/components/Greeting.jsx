import React from 'react'

const Greeting = ({username, userAge}) => {
  return (
    <div>
        <h1>Hello {username}</h1>
        <h1>my age is {userAge}</h1>
    </div>
  )
}

export default Greeting