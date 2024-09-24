import { Course, Module, UserProgress, Video } from '../models/course.model.js';

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