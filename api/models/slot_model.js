(id, facility_id, datefrom, dateto, timefrom, timeto, pet_id)
import mongoose from 'mongoose'

const slotSchema = new mongoose.Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: Number,
        required: true
    },
    startTime: {
        type: String,
        require: true
    },
    endTime: {
        type: String,
        require: true
    },
    boarding: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Boarding',
        require : true
    },
    pet : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Pet',
        require : true
    }
    
}, { timestamps: true } );

const Slot = mongoose.model('Slot', slotSchema);

export default Slot;