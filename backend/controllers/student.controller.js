import Event from "../models/Event.js";
import jwt from "jsonwebtoken";

export const createEvent = async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET_KEY,
    );
    console.log(userId);
    const {
      title,
      description,
      date,
      startTime,
      endTime,
      expectedParticipants,
      purpose,
    } = req.body;

    console.log("Hello world");
    
    console.log(req.body);

    // basic validation
    if (
      !title ||
      !description ||
      !date ||
      !startTime ||
      !endTime ||
      !expectedParticipants ||
      !purpose
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const event = await Event.create({
      studentId: userId,
      title,
      description,
      date,
      startTime,
      endTime,
      expectedParticipants,
      purpose,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.log("Error: ", error);

    res.status(500).json({
      message: "Error creating event",
      error: error.message,
    });
  }
};

export const getEventsByStudentId = async (req, res) => {
  try {
    const { userId } = jwt.verify(
      req.cookies.token,
      process.env.JWT_SECRET_KEY,
    );

    const events = await Event.find({ studentId: userId });

    if (!events.length) {
      return res.status(404).json({
        message: "No events found for this student",
      });
    }

    res.status(200).json({
      events,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events",
      error: error.message,
    });
  }
};
