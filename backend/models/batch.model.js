import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
    batchName:{
        type:String,
        require:true,
    },
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        require:true,
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        require:true, 
    }],
    instructorId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Instructor',
    }
},{timestamps:true});

const Batch = mongoose.model('Batch',batchSchema);

module.exports = Batch;