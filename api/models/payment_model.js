import mongoose from 'mongoose'

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        require: true
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pet',
        require : true
    }
    
}, { timestamps: true } );

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;