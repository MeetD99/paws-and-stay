import mongoose from 'mongoose'

const boardingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    capacity: {
        type: Number
    },
    services: [{
        name: String,
        rate: Number
    }],
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    contact_number:{
        type: String,
        require: true
    }
    
}, { timestamps: true } );

const Boarding = mongoose.model('Boarding', boardingSchema);

export default Boarding;