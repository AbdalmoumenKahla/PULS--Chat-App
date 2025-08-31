const socketIo = (io) => {

    const connectedUsers = new Map(); // To track online users

    io.on('connection', (socket) => {
        
        const user = socket.handshake.auth.user;
        console.log('New user connected:', user?.username);
        // join room handler
        socket.on("join room", (groupId) => {
            if (!connectedUsers.has(user.id)) {
                connectedUsers.set(user.id, socket.id);
            }
            socket.join(groupId);
            console.log(`User ${user?.username} joined room: ${groupId}`);
            const usersInRoom = Array.from(connectedUsers.values()).filter(userId => connectedUsers.get(userId) === socket.id);
            io.in(groupId).emit("online users", usersInRoom);
            socket.to(groupId).emit("user joined", { user: user?.username, users: usersInRoom });
        });

        // leave room handler
        socket.on("leave room", (groupId) => {
            socket.leave(groupId);
            console.log(`User ${user?.username} left room: ${groupId}`);
            if (connectedUsers.get(user.id) === socket.id) {
                connectedUsers.delete(user.id);
                socket.to(groupId).emit("user left", { user: user?.username });
            }
            const usersInRoom = Array.from(connectedUsers.keys()).filter(userId => connectedUsers.get(userId) === socket.id);
            io.in(groupId).emit("online users", usersInRoom);
        
        });
    
        // handle sending message
        socket.on("new message", (groupId, message) => {
            console.log(`New message in room ${groupId}: ${message}`);
            socket.to(groupId).emit("new message", { user: user?.username, message });
        });

        // disconnect handler
        socket.on('disconnect', () => {
            console.log('Client disconnected');
            if (connectedUsers.get(user.id) === socket.id) {
                const userData = connectedUsers.get(user.id);
                connectedUsers.delete(user.id);
                socket.to(userData.groupId).emit("user left", { user: user?.username });    

            }
        });

        // typing indicator
        socket.on("typing", (groupId) => {
            socket.to(groupId).emit("typing", { user: user?.username });
        });

        // stop typing indicator
        socket.on("stop typing", (groupId) => {
            socket.to(groupId).emit("stop typing", { user: user?.username });
        });
    });
}

module.exports = socketIo;