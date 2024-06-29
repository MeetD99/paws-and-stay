import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../redux/user/userSlice.js'
import { useDispatch } from 'react-redux';

const UserSignin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [isUser, setIsUser] = useState(true);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
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
        const res = await fetch('/api/user/auth/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        const data = await res.json()
        // console.log(data)

        if(data.success === false){
            console.log(data.message)
            return
        }
        dispatch(setUser(data));
        navigate('/dashboard')
    }
    catch(err){
      console.log(err)
    }
  }

  async function submitDataFacility(event){
    event.preventDefault()
    try{
        const res = await fetch('/api/boarder/auth/signin', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        })
        const data = await res.json()
        // console.log(data)

        if(data.success === false){
            console.log(data.message)
            return
        }
        navigate('/facilitydashboard')
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <>
      <div className="reg-container">
      <div className="hero">
          <h1>Pet</h1>
          <div className="hero-buttons">
            <div className="hero-btn" onClick={handleUserClick}>
                <h3>Login as a Pet Owner</h3>
                <p>Add your pets and hire boarding facilities for them!</p>
            </div>
            <div className="hero-btn" onClick={handleFacilityClick}>
              <h3>Login as a Boarding Facility</h3>
              <p>Add your services and attract pet owners!</p>
            </div>
          </div>
      </div>
      {isUser ? <div className="auth">
        <h1>Login as Pet Owner</h1>
        <form>
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
          <button onClick={submitData}>Login</button>
          {/* {err && <p>{err}</p>} */}
          <span>
            Don't have an account? <Link to="/">Register</Link>
          </span>
        </form>
      </div> : <div className="auth">
        <h1>Login as Boarding Facility</h1>
        <form>
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
          <button onClick={submitDataFacility}>Login</button>
          {/* {err && <p>{err}</p>} */}
          <span>
            Don't have an account? <Link to="/">Register</Link>
          </span>
        </form>
      </div>
      }
      </div>
    </>
  )
}

export default UserSignin;
