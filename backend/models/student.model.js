import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    batchId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Batch',
        require:true,
    }],
    coursesEnrolled: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        expiryDate: {
            type: Date,
            required: true
        }
    }],
})

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;