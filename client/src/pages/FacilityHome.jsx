import React from 'react'
import { Link } from 'react-router-dom'
import MyServices from './MyServices'
const FacilityHome = () => {
  return (
    <div>
        <div className="pets-section2">
            <h2>Our Services</h2>
            <Link to={'/facilitydashboard/addservice'}><button>Add services</button></Link>
        </div>
        <div className="services">
            <MyServices />
        </div>
    </div>
    
  )
}

export default FacilityHome