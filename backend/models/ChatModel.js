const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false  // Made optional for group chats
    },
    content: {
        type: String,
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
