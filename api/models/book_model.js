import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    pickupTime: {
        type: Number,
        required: true
    },
    dropTime: {
        type: String,
        require: true
    },
    status: {
        type : String,
        require: true
    },
    service: {
        type: String,
        require: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        require : true
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pet',
        require : true
    },
    boardingFacility: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Boarding',
        require : true
    }
    
}, { timestamps: true } );

const Book = mongoose.model('Book', bookSchema);

export default Book;