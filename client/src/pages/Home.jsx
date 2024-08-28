import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Home() {

  
  const [boarding, setBoarding] = useState([]);
  const [ boardingServices, setBoardingServices] = useState([]);
  const [visibleServices, setVisibleServices] = useState({});

  console.log(boarding)
  useEffect(()=>{
    async function getFacilities(){
      try{
          const res = await fetch('https://paws-and-stay-backend.vercel.app/api/boarder/getBoarder', {
              method: "GET",
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          const data = await res.json()
  
          if(data.success === false){
              console.log(data.message)
              return
          }
          setBoarding(data)
      }
      catch(err){
          console.log(err)
      }
      
    }
    getFacilities()
  }, [])

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function closeBookForm(){
    const addNew = document.querySelector('.add-book-form-container')
    addNew.style.display = 'none'
    
  }

  function showBookFrom(){
    const addNew = document.querySelector('.add-book-form-container')
    addNew.style.display = 'grid'
  }


  function showServices(id){
    const el = document.getElementById(id)
    el.style.display  = 'block'
    const but = document.getElementById(id + 'button')
    but.style.display = 'none'
  }

  function hideServices(id){
    const el = document.getElementById(id)
    el.style.display  = 'none'
    const but = document.getElementById(id + 'button')
    but.style.display = 'block'
  }

  // const toggleServices = (id) => {
  //   setVisibleServices(prevState => ({
  //     ...prevState,
  //     [id]: !prevState[id]
  //   }));
  // };

  return (
    <div>
      <div className="pets-section">
        <Link to={'/dashboard/mypets'}><button>My Pets</button></Link>
        <Link to={'/dashboard/addpet'}><button>Add a Pet</button></Link>
      </div>
      
        <div className="taglines">
          <div className="tagline1">
              <p>
              Find buddies <br />
              for your Pets <br />
              with Paws&Stay! <br />
              </p>
          </div>

          <div className="tagline2">
            Your Pet's Home <br />
            away from <br />
            Home
           
          </div> 
        </div>
        <div className="facilities">
            <h1 className='boarding-fac-title'>Available Facilities</h1>
            {boarding == {} ? (<h1>No Services Yet!</h1>) : 

              <div className="facilities-container">
                {boarding.map((item) => {
                  return (

                  <div key={item._id} className='facility-div'>
                    
                      <h1>{item.name}</h1>
                      <h2>Email: {item.email}</h2>
                      <h2>Contact Number: {item.contact_number}</h2>
                    
                    
                    <button id={item._id + item.name + 'button'} onClick={()=>showServices(item._id + item.name)}>Services</button>
                    <div id={item._id + item.name} className='facility-services' style={{display : 'none'}}>
                
                      {item.services.map((x)=>{
                        return(
                          <>
                            <p><span>{x.name} - {x.rate}/hrs</span>&emsp;<button onClick={showBookFrom}>Book now</button></p>
                            <div className='add-book-form-container'>
                              <form action="" className='add-book-form'>
                                <label>Facility</label>
                                <h2>{item.name}</h2>
                                <label>Service</label>
                                <h2>{x.name}</h2>
                                <label>Rate-per-hour</label>
                                <h2>${x.rate}</h2>
                              <label htmlFor="datefrom">Date From</label>
                                <input
                                  required
                                  type="date"
                                  placeholder="Enter From Date"
                                  name="date"
                                  onChange={handleChange}
                                />
                                <label htmlFor="dateto">Date To</label>
                                <input
                                  required
                                  type="date"
                                  placeholder="Enter To Date"
                                  name="dateto"
                                  onChange={handleChange}
                                />
                                <label htmlFor="time">Time Slot</label>
                                <input
                                  required
                                  type="text"
                                  placeholder="From 0:0 to 0:0"
                                  name="time"
                                  onChange={handleChange}
                                />
                                <button onClick={() => {
                                  alert("Booking Successfull!");
                                  closeBookForm()
                                  

                                }}>Book Now!</button>
                              </form>
                              </div>
                          </>
                        )
                      })}
                      
                      <button onClick={() => hideServices(item._id + item.name)}>hide services</button>
                    </div>
                  </div>)
                })}
              </div>
            }
        </div>
        
        

    </div>
  )
}