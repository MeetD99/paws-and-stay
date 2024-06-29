import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const AddServices = () => {
    const navigate = useNavigate();
    const currentUser = useSelector((state)=>state.user.user)

    const [inputs, setInputs] = useState({
        name: "",
        rate: "",
        userId: currentUser._id
    })


    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }

  async function submitData(event){
    event.preventDefault()
    try{
        const res = await fetch('/api/boarder/update/services', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputs)
        });

        const data = await res.json()

        if(data.success === false){
            console.log(data.message)
            return 
        }
        navigate('/facilitydashboard');
    }
    catch(err){
        console.log(err)
    }
}


  return (
    <div className="pets-form-container auth">
        <h1>Add a Service</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input 
            required 
            type="text" 
            placeholder='Enter Name of the Service'
            name='name'
            onChange={handleChange}
          />
          <label htmlFor="rate">Rates-Per-Hour</label>
          <input
            required
            type="number"
            placeholder="Enter rate-per-hour of the Service"
            name="rate"
            onChange={handleChange}
          />
            <button onClick={submitData}>Add</button>
          
        </form>
    </div>
  )
}

export default AddServices