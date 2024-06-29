import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact_info: {
        type : Number,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    pets: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pet'
    }],
    ratings: {
        type : Number
    },

}, { timestamps: true } );

const User = mongoose.model('User', userSchema);

export default User;