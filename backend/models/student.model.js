import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    
    coursesEnrolled: [{
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        expiryDate: {
            type: Date,
            default:null,
        }
    }],
})

export const Student = mongoose.model('Student',studentSchema);

