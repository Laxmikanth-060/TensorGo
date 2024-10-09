import { Course, Module, UserProgress, Video, Review } from '../models/course.model.js';
import { Student } from '../models/student.model.js';
export const createCourseWithDetails = async (req, res) => {
  try {
    // Create Course
    const newCourse = new Course({
      ...req.body.courseInfo,
      pricingInfo: req.body.pricingInfo,
    });
    const savedCourse = await newCourse.save();

    // Create Modules and Store Videos
    const modulePromises = req.body.courseMaterials.map(async (module) => {
      const videos = await Promise.all(module.videosList.map(async (video) => {
        const newVideo = new Video(video);
        return await newVideo.save();
      }));
      
      const newModule = new Module({ ...module, videosList: videos.map(video => video._id) });
      const savedModule = await newModule.save();
      
      await Course.findByIdAndUpdate(savedCourse._id, { $push: { modules: savedModule._id } });

      return savedModule;
    });

    await Promise.all(modulePromises);

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate({
      path: 'modules',
      populate: {
        path: 'videosList',
      },
    });
    
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//To mark the video as completed
export const markVideoAsCompleted = async (req, res) => {
  const { userId, courseId, videoId } = req.body;

  try {
    // Find the user's progress in the course
    let progress = await UserProgress.findOne({ userId, courseId });
    if (!progress) {
      // If no progress exists, create a new entry
      progress = new UserProgress({
        userId,
        courseId,
        completedVideos: [{ videoId }],
      });
    } else {
      // If progress exists, add the videoId to completedVideos
      progress.completedVideos.push({ videoId });
    }

    await progress.save();
    return res.status(200).json({ message: 'Video marked as completed', progress });
  } catch (error) {
    return res.status(500).json({ message: 'Error marking video as completed', error });
  }
};

// Function to get user's progress
export const getUserProgress = async (req, res) => {
  const { userId, courseId } = req.params;
  try {
    const progress = await UserProgress.findOne({ userId, courseId });
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    return res.status(200).json({ progress });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching progress', error });
  }
};



export const courseReview = async (req, res) => {
  const { user, courseId, rating, review } = req.body;

  try {
    const userId = user._id;

    const existingReview = await Review.findOne({ user: userId, course: courseId });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already submitted a review for this course.' });

    }

    // Create a new review if no existing review is found
    const newReview = new Review({
      user: userId,
      course: courseId,
      rating,
      review,
    });

    await newReview.save();

    await Course.findByIdAndUpdate(courseId, {
      $push: { reviews: newReview._id },
    });

    res.status(201).json({ message: 'Review created successfully!', review: newReview });
  } catch (error) {
    // console.error('Error creating review:', error);
    res.status(500).json({ message: 'Error creating review' });
  }
};




export const getCourseReviews = async (req, res) => {
  const { courseId } = req.params;  
  // console.log(`Fetching reviews for course ID: ${courseId}`);

  try {
    // Fetch reviews for the course and populate user details
    const reviews = await Review.find({ course: courseId })
      .populate('user', 'username profileImg') 
      .exec();

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this course' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    // console.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

export const getRegisteredCourseByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
      const student = await Student.findOne({ userId: userId }).populate('coursesEnrolled.courseId');

      if (!student) {
          return res.status(404).json({ message: 'Student not found' });
      }
      const enrolledCourses = student.coursesEnrolled.map(enrollment => enrollment.courseId);
      res.json(enrolledCourses);
  } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: 'Server error' });
  }
};



// Controller to delete a course and its related data
export const deleteCourseById = async (req, res) => {
  try {
    const { courseId } = req.params; 
    console.log("Course Id:",courseId)
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Delete associated modules and videos
    const moduleIds = course.modules;
    console.log(moduleIds)
    await Promise.all(
      moduleIds.map(async (moduleId) => {
        console.log("Hii");
        const module = await Module.findById(moduleId);
        console.log(module)
        if (module) {
          await Video.deleteMany({ _id: { $in: module.videosList } });
        }
        await Module.findByIdAndDelete(moduleId);
      })
    );
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: 'Course and associated data deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course', error: error.message });
  }
};


//Not required but dont remove
// export const getModulesByCourseId = async (req, res) => {
//   try {
//     const courseId = req.params.courseId;
//     const modules = await Module.find({ course: courseId }).populate('videosList');
//     if (!modules) {
//       return res.status(404).json({ error: 'Modules not found' });
//     }
//     res.json(modules);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };