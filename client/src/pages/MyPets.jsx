import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import pcds from '../assets/dog_img.jpg'
import { Link } from 'react-router-dom';

const MyPets = () => {
    const currentUser = useSelector((state)=>state.user.user)
    const [ pets, setPets ] = useState([]);

    useEffect(()=>{
        async function getPetData(){
            try{
                const res = await fetch('/api/pet/getPets', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userId : currentUser.email})
                })
                const data = await res.json()
                console.log(data)
        
                if(data.success === false){
                    console.log(data.message)
                    return
                }
                setPets(data.userPets)
            }
            catch(err){
                console.log(err)
            }
        }
        getPetData();
    }, [currentUser])

  return (
    <>  
        <div className="your_pets">
                    <h1>Your Pets</h1>
                    <Link to={'/dashboard'}> <button>Dashboard</button> </Link>
        </div> 
        {pets.length === 0 ? ( <h1>No Pets Added Yet!</h1> ) :
            <div className="mypets">
                {pets.map((pet) => (
                    <div className="pet" key={pet.id}>
          
                        
                            <div className="pet_img">
                                <img src={pcds} alt="Pet-Logo" width={150}/>
                                <h1>{pet.name}</h1>
                            </div>
                            <div className="pets_info_details">
                                
                                <h2>Breed: {pet.breed}</h2>
                                <h2>Age: {pet.age}</h2>
                                <h3>Dietary Preference: {pet.dietaryPref}</h3>
                                <h3>Medical Records: <a href={pet.medicalRecord} target='_blank'>Open Record!</a></h3>
                            </div>
                            
                           
                    </div>
                )) }
            </div>
        }
    </>
  )
}

export default MyPets