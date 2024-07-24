import {Module, Video} from '../models/course.model.js';

export const getAllModules = async (req, res) => {
  try {
    const modules = await Module.find().populate('course videosList');
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModuleById = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const module = await Module.findById(moduleId).populate('videosList');
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getVideosByModuleId = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const videos = await Video.find({ _id: { $in: (await Module.findById(moduleId)).videosList } });
    if (!videos) {
      return res.status(404).json({ error: 'Videos not found' });
    }
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createVideoForModule = async (req, res) => {
  try {
    const moduleId = req.params.moduleId;
    const newVideo = new Video(req.body);
    const savedVideo = await newVideo.save();
    await Module.findByIdAndUpdate(moduleId, { $push: { videosList: savedVideo._id } });
    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
