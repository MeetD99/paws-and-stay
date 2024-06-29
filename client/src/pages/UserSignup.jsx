import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/user/userSlice.js'

const UserSignup = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { loading, error } = useSelector(state =>state.user)

  const [isUser, setIsUser] = useState(true);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    contact_no: "",
  })
  
  const [boardingInputs, setBoardingInputs] = useState({
    name: "",
    email: "",
    password: "",
    contact_no: "",
    capacity : 0
  })

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleBoardingChange = e => {
    setBoardingInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleUserClick = () => {
    setIsUser(true);
  }

  const handleFacilityClick = () => {
    setIsUser(false);
  }

  async function submitData(event){
    event.preventDefault()
    try{
        const res = await fetch('/api/user/auth/signup', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        const data = await res.json()
        console.log(data)

        if(data.success === false){
            console.log(data.message)
            return
        }
        dispatch(setUser(data));
        navigate('/dashboard');
    }
    catch(err){
        console.log(err)
    }
}

async function submitDataFacility(event){
  event.preventDefault()
  try{
      const res = await fetch('/api/boarder/auth/signup', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(boardingInputs)
      })
      const data = await res.json()
      console.log(data)

      if(data.success === false){
          console.log(data.message)
          return
      }
      dispatch(setUser(data));
      navigate('/facilitydashboard');
  }
  catch(err){
      console.log(err)
  }
}

console.log(`error: ${error}`)

  return (
    <>
      <div className="reg-container">
      <div className="hero">
          <h1>Pet</h1>
          <div className="hero-buttons">
            <div className="hero-btn" onClick={handleUserClick}>
                <h3>Register as a Pet Owner</h3>
                <p>Add your pets and hire boarding facilities for them!</p>
            </div>
            <div className="hero-btn" onClick={handleFacilityClick}>
              <h3>Register as a Boarding Facility</h3>
              <p>Add your services and attract pet owners!</p>
            </div>
          </div>
      </div>
      {isUser ? <div className="auth">
        <h1>Register as a Pet Owner</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input 
            required 
            type="text" 
            placeholder='Enter your Name'
            name='name'
            onChange={handleChange}
          />
          <label htmlFor="email">Email ID</label>
          <input
            required
            type="email"
            placeholder="Enter your Email ID"
            name="email"
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            placeholder="Enter a Password"
            name="password"
            onChange={handleChange}
          />
          <label htmlFor="contact_no">Contact Number</label>
          <input 
            required
            type="text" 
            placeholder='Enter Contact Number'
            name="contact_no" 
            onChange={handleChange}
          />
          <button onClick={submitData}>Register</button>
          {/* {err && <p>{err}</p>} */}
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div> : 
      <div className="auth">
        <h1>Register as a Boarding Facility</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input 
            required 
            type="text" 
            placeholder='Enter name of the facility'
            name='name'
            onChange={handleBoardingChange}
          />
          <label htmlFor="email">Email ID</label>
          <input
            required
            type="email"
            placeholder="Enter your Email ID"
            name="email"
            onChange={handleBoardingChange}
          />
          <label htmlFor="password">Password</label>
          <input
            required
            type="password"
            placeholder="Enter a Password"
            name="password"
            onChange={handleBoardingChange}
          />
          <label htmlFor="contact_no">Contact Number</label>
          <input 
            required
            type="text" 
            placeholder='Enter Contact Number'
            name="contact_no" 
            onChange={handleBoardingChange}
          />
          <label htmlFor="capacity">Capacity</label>
          <input 
            required
            type="number" 
            placeholder='Enter your capacity'
            name="capacity" 
            onChange={handleBoardingChange}
          />
          <button onClick={submitDataFacility}>Register</button>
          {/* {err && <p>{err}</p>} */}
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
        
      </div>
      }
      </div>
    </>
    
  )
}

export default UserSignup;