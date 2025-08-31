const express = require('express');
const Message = require('../models/ChatModel');
const {protect} = require("../middleware/authMiddleware");

const messageRouter = express.Router();

messageRouter.post("/", protect, async (req, res) => {
    try {
        const { content, groupId } = req.body;
        const message = await Message.create({
            content,
            sender: req.user._id,
            group: groupId
            // No receiver needed for group messages
        });
        
        // Populate the sender info before sending response
        const populatedMessage = await Message.findById(message._id)
            .populate("sender", "username email");
            
        res.status(201).json(populatedMessage);
    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//get message for a group
messageRouter.get("/:groupId", protect, async (req, res) => {
    try {
        const messages = await Message.find({ group: req.params.groupId })
            .populate("sender", "username email")
            .sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error retrieving messages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
module.exports = messageRouter;
