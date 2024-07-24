import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  level: {
    type: String,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  thumbnailImage: {
    type: String,
    // required: true,
  },
  coverImage: {
    type: String,
    // required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true,
    ref: 'Instructor',
  },
  duration: {
    type: Number,
    // required: true,
  },
  publishedDate: {
    type: Date,
    // required: true,
  },
  rating: {
    type: Number,
    // required: true,
  },
  modules: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Module',
    },
  ],
  pricingInfo: {
    price: {
      type: Number,
      // required: true,
    },
    upiId: {
      type: String,
      // required: true,
    },
  },
}, { timestamps: true });

const moduleSchema = new mongoose.Schema({
  moduleName: {
    type: String,
    // require: true,
  },
  videosList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'Video',
    },
  ],
});

const videoSchema = new mongoose.Schema({
  videoName: {
    type: String,
    // require: true,
  },
  videoUrl: {
    type: String,
    // require: true,
  },
  duration: {
    type: Number,
    // required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  publishedDate: {
    type: Date,
    // required: true,
  },
}, { timestamps: true });

export const Course = mongoose.model('Course', courseSchema);
export const Module = mongoose.model('Module', moduleSchema);
export const Video = mongoose.model('Video', videoSchema);
