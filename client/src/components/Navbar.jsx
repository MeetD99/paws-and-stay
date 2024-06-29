import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/image.png';
const Navbar = () => {

  const navigate = useNavigate()


  const currentUser = useSelector((state)=>state.user)
  console.log(currentUser);

  const userName = currentUser.user.name;
  
  const signoutUser = async()=>{
    try{
      const res = await fetch('/api/user/auth/signout')
      const data = res.json()
      if(data.success === false){
        console.log(data.message)
        return
      }
      navigate('/login')
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <nav>
      <div className="navbar-container">
        <div className="brandName">
          <img src={Logo} alt="" width={100}/>
          {/* <Link to={'/dashboard'}><h1>Paws&Stay</h1></Link> */}
        </div>
        <div className="home-buttons">
          <p>Hello, {userName.replace(/\b\w/, char => char.toUpperCase())}</p>
          <button className='signout' onClick={signoutUser}>Sign Out</button>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar