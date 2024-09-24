import { Student } from "../models/student.model.js";
import User from "../models/user.model.js";
import mongoose from 'mongoose';

export const enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.user?.id;

        // Validate courseId
        // if (!mongoose.isValidObjectId(courseId)) {
        //     return res.status(400).json({ message: "Invalid course ID." });
        // }

        let student = await Student.findOne({ userId });
        if (!student) {
            student = new Student({
                userId,
                coursesEnrolled: []
            });
            await student.save();
        }

        // Check for already enrolled courses
        const alreadyEnrolled = student.coursesEnrolled.some(enrollment => enrollment.courseId.toString() === courseId);

        if (alreadyEnrolled) {
            return res.status(400).json({ message: "You are already enrolled in this course." });
        }

        // Push the new course enrollment
        student.coursesEnrolled.push({ courseId, expiryDate: null });
        await student.save();

        // Correctly fetching the user by userId
        const user = await User.findById(userId);  // Directly using userId here
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        user.studentId = student._id;
        await user.save();

        res.status(201).json({ message: "Successfully enrolled in the course.", student });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
