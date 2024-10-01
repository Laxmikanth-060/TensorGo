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
    discount: {
      type: Number,
      default: 0,
    },
    upiId: {
      type: String,
      // required: true,
    },
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',  // Refers to the Review model
    },
  ],
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


const reviewSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',  // Refers to the Course model
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // If you have a User model for tracking who wrote the review
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});


const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  completedVideos: [
    {
      videoId: {
        type: String,
      },
      completedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

export const Course = mongoose.model('Course', courseSchema);
export const Module = mongoose.model('Module', moduleSchema);
export const Video = mongoose.model('Video', videoSchema);
export const Review = mongoose.model('Review',reviewSchema);
export const UserProgress = mongoose.model('UserProgress', UserProgressSchema);

