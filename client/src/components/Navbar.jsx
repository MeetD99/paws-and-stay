import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = () => {


  const currentUser = useSelector((state)=>state.user)
  console.log(currentUser);

  const userName = currentUser.user.name;
  

  return (
    <nav>
      <div className="navbar-container">
        <div className="brandName">
          <Link to={'/dashboard'}><h1>Paws&Stay</h1></Link>
        </div>
        <div className="home-buttons">
          <p>Hello, {userName.replace(/\b\w/, char => char.toUpperCase())}</p>
          <button className='signout'>Sign Out</button>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar