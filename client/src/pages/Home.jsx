import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
export default function Home() {

  
  const [boarding, setBoarding] = useState(null);

  console.log(boarding)
  useEffect(()=>{
    async function getFacilities(){
      try{
          const res = await fetch('/api/boarder/getBoarder', {
              method: "GET",
              headers: {
                  'Content-Type': 'application/json'
              }
          })
          const data = await res.json()
          console.log(data)
  
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


  return (
    <div>
      <div className="pets-section">
        <Link to={'/dashboard/mypets'}><button>My Pets</button></Link>
        <Link to={'/dashboard/addpet'}><button>Add a Pet</button></Link>
      </div>
      
        <div className="taglines">
          <div className="tagline1">
              <p>
              The Best Platform <br />
              for finding your <br />
              pet buddy
              </p>
          </div>

          <div className="tagline2">
            Your's Pet Home <br />
            away from <br />
            Home
           
          </div> 
        </div>

        {/* {boarding == {} ? (<h1>No Services Yet!</h1>) :  */}
        <div className="facilities-container">
            {boarding.map((item)=>{
              <div>{item.name}</div>
            })}
        </div>
        
        

    </div>
  )
}