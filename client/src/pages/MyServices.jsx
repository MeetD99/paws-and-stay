import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const MyServices = () => {
    const currentUser = useSelector((state)=>state.user.user)

    const [ services, setServices ] = useState([]);
    
    useEffect(()=>{
        async function getPetData(){
            try{
                const res = await fetch('/api/boarder/myservices', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userId : currentUser._id})
                })
                const data = await res.json()
        
                if(data.success === false){
                    console.log(data.message)
                    return
                }
                setServices(data.userServices)
            }
            catch(err){
                console.log(err)
            }
        }
        getPetData();
    }, [currentUser])
    
  return (
    <div>
        {services.length === 0 ? ( <h1>No services Added Yet!</h1> ) :
            <div className="myservices">
                {services.map((service) => (
                    <div className="service" key={service.id}>
                        <div className="service_details">
                            <div className="service_name">
                                <h1>{service.name}</h1>
                            </div>
                            
                            <div className="service_rate">
                                {service.rate}
                            </div>
                            
                        </div>
                        
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default MyServices