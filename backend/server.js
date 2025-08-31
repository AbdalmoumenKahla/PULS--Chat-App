const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const http = require('http');
const userRouter = require('./routes/userRoutes');
const groupRouter = require('./routes/groupRoutes');
const messageRouter = require('./routes/messageRoutes');
const socket = require('socket.io');
const socketIo = require('./sockets');
const cors = require('cors');
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = socket(server, { 
    cors: { 
        origin: ["http://localhost:3000", "http://localhost:5173"],
        methods: ['GET', 'POST'],
        credentials: true
    }
 });

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// initialize socket.io
socketIo(io);
// our routes
app.use('/api/users', userRouter);
app.use('/api/groups', groupRouter);
app.use('/api/messages', messageRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
