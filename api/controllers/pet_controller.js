import Pet from '../models/pet_model.js'
import User from '../models/user_model.js'

export const create = async (req, res, next)=>{
    const { name, breed, age, diet, records, user } = req.body;
    const newPet = new Pet({name, breed, age, owner: user, medicalRecord: records, dietaryPref: diet})
    try{
        await newPet.save()
        await User.findByIdAndUpdate(
            user,
            { $push: { pets: newPet._id} },
            { new: true, useFindAndModify: false }
        )
        res.status(200).json({'message': 'new pet added'})
        
    }catch(err){
        next(err);
    }
}


export const getPets = async (req, res, next)=>{
    const { userId }= req.body;
    console.log(userId)

    try{
        const findinguser = await User.findOne({ _id: userId })
        console.log(findinguser)
        const userPetIds = findinguser.pets

        const userPets = await Pet.find({_id : { $in: userPetIds}})
        res.status(200).json({message: "succsesfully fetched pets!" , userPets})
            
        
    }catch(err){
        next(err);
    }
}
