import Boarding from '../models/boarding_model.js'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'  
import { errorHandler } from '../utils/error.js'


export const signup = async (req, res, next)=>{
    const { name, contact_no, email, password, capacity } = req.body;
    const hasedPass = bcryptjs.hashSync(password, 10)
    const newBoarding = new Boarding({name, contact_number: Number(contact_no), email, password: hasedPass, services: [], capacity})
    try{
        await newBoarding.save()
        const validBoarding = await Boarding.findOne({email}) 
        const token = jwt.sign({id: validBoarding._id}, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validBoarding._doc
        res.cookie('access_token_boarding', token, {httpOnly: true}).status(200).json(rest)
        
    }catch(err){
        next(err);
    }
}

export const signin = async (req, res, next)=>{
    const { email, password } = req.body;
    try{
        const validBoarding = await Boarding.findOne({email}) 
        if(!validBoarding) return next(errorHandler(404, "User not found!"))
        const validPassword = bcryptjs.compareSync(password, validBoarding.password)
        if(!validPassword) return next(errorHandler(401, "Wrong credentials!"))

        const token = jwt.sign({id: validBoarding._id}, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validBoarding._doc
        res.cookie('access_token_boarding', token, {httpOnly: true}).status(200).json(rest)
    }
    catch(err){
        next(err)
    }
}

export const signout = async (req, res, next)=>{
    try{
        res.clearCookie('access_tocken_boarding');
        res.status(200).json("User has been log out!")
    }
    catch(err){
        next(err)
    }
}


export const getBoarder = async (req, res, next)=>{
    try{
        const boarding = await Boarding.find({}) 
        res.status(200).json(boarding)
    }
    catch(err){
        next(err)
    }
}

export const upServices = async (req, res, next)=>{
    const { name, rate, userId } = req.body;
    try{
        await Boarding.findByIdAndUpdate(
            userId,
            { $push: { services: {name, rate}} },
            { new: true, useFindAndModify: false }
        )
        res.status(200).json({'message': 'new sevice added'})
        
    }catch(err){
        next(err);
    }
}



export const myservices = async (req, res, next)=>{
    const { userId } = req.body;

    try{
        if(!userId){
            res.status(200).json({message: "userId not found!"})
        }
        const findinguser = await Boarding.findOne({ _id: userId })
        if(!findinguser){
            res.status(200).json({message: "user not found!"})
        }
        const userServices = findinguser.services
        res.status(200).json({message: "succsesfully fetched services!" , userServices})
            
        
    }catch(err){
        next(err);
    }
}

