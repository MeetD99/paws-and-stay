import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const MyPets = () => {
    const currentUser = useSelector((state)=>state.user)
    const [pets, setPets] = useState(null);

    useEffect(()=>{
        async function getPetData(){
            try{
                const res = await fetch('/api/pet/getPets', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userId : currentUser._id})
                })
                const data = await res.json()
                console.log(data)
        
                if(data.success === false){
                    console.log(data.message)
                    return
                }
                setPets(data)
            }
            catch(err){
                console.log(err)
            }
        }
        getPetData();
    }, [])

  return (
    <>
        {/* {pets.length === 0 ? ( <h1>No Pets Added Yet!</h1> ) :
            <div className="mypets">
                {pets.map((pet) => (
                    <div className="pet" key={pet.id}>
                        <h1>{pet.name}</h1>
                        <h2>Breed: {pet.breed}</h2>
                        <h2>Age: {pet.age}</h2>
                        <h3>Dietary Preference: {pet.diet}</h3>
                        <h3>Medical Records: {pet.records}</h3>
                    </div>
                )) }
            </div>
        } */}
        My Pets
    </>
  )
}

export default MyPets