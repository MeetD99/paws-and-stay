import mongoose from 'mongoose'

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        require : true
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    medicalRecord: {
        type : String,
        require: true
    }, 
    dietaryPref: {
        type: String,
        require: true
    }
    
}, { timestamps: true } );

const Pet = mongoose.model('Pet', petSchema);

export default Pet;