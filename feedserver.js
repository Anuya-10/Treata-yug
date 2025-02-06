const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/feedbackDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Feedback Schema
const feedbackSchema = new mongoose.Schema({ text: String });
const Feedback = mongoose.model("Feedback", feedbackSchema);

// API to handle feedback submission
app.post("/submit-feedback", async (req, res) => {
    const { feedback } = req.body;
    if (!feedback) return res.status(400).json({ message: "Feedback is required" });

    try {
        const newFeedback = new Feedback({ text: feedback });
        await newFeedback.save();
        res.json({ message: "Feedback submitted successfully! 😊 " });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Start the server
app.listen(5001, () => console.log("Server running on port 5001"));
app.get("/get-feedbacks", async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
