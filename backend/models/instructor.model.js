import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    batchId:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Batch',
    }],
    coursesTaught: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }],
})

const Instructor = mongoose.model('Instructor',instructorSchema);

module.exports = Instructor;