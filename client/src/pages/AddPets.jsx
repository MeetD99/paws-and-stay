import React, { useState } from 'react'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useNavigate } from 'react-router-dom'


const AddPets = () => {

    const navigate = useNavigate();
    const currentUser = useSelector((state)=>state.user)

    const [inputs, setInputs] = useState({
        name: "",
        breed: "",
        age: "",
        diet: "",
        records: "",
        user:  currentUser._id
      })

      const [ image, setImage ] = useState(null) 
      const [ loading, setLoading ] = React.useState(false)
    
      const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
      }


      async function submitData(event){
        event.preventDefault()
        setLoading(true)
        const storage = getStorage(app)
        const imageName = new Date().getTime() + image.name
        const storageRef = ref(storage, imageName)
        const uploadTask = uploadBytesResumable(storageRef, image)

        try{
            const downloadURL = await new Promise((resolve, reject)=>{
                uploadTask.on(
                    "state_changed",
                    (snapshot)=>{
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(`upload is ${progress}% done`)
                    },
                    (error)=>{
                        console.log(error)
                    },
                    ()=>{
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                            resolve(downloadURL)
                        }).catch(reject);
                    }
                )
            })
                
            const updatedFormData = {...inputs, records : downloadURL}
       
            const res = await fetch('/api/pet/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData)
            });

            const data = await res.json()

            if(data.success === false){
                console.log(data.message)
                return 
            }
            setLoading(false)
            navigate('/dashboard');
        }
        catch(err){
            console.log(err)
        }
    }

      
  return (
    <div className="pets-form-container auth">
        <h1>Add a Pet</h1>
        <form>
          <label htmlFor="name">Name</label>
          <input 
            required 
            type="text" 
            placeholder='Enter name of the pet'
            name='name'
            onChange={handleChange}
          />
          <label htmlFor="breed">Breed</label>
          <input
            required
            type="text"
            placeholder="Enter your pet's breed"
            name="breed"
            onChange={handleChange}
          />
          <label htmlFor="age">Age</label>
          <input
            required
            type="text"
            placeholder="Enter its Age"
            name="age"
            onChange={handleChange}
          />
          <label htmlFor="diet">Diet</label>
          <input 
            required
            type="text" 
            placeholder='Enter its Diet Preference'
            name="diet" 
            onChange={handleChange}
          />
          <label htmlFor="records">Medical Records</label>
          <input 
            id='image'
            required
            type="file" 
            name="records" 
            accept='image/*'
            onChange={ (e)=>setImage(e.target.files[0]) }
          />

          {loading? 
            <button disabled> Loading...</button>:
            <button onClick={submitData}>Add</button>
          }
        </form>
    </div>
  )
}

export default AddPets

