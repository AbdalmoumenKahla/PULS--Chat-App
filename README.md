# Puls-ChatApp - Real-Time Group Chat Application

A modern, real-time group chat application built with React.js frontend and Node.js backend, featuring Socket.IO for instant messaging, user authentication, and group management.

## ✨ Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **Group Chat**: Create and join multiple chat groups
- **User Authentication**: Secure login/register with JWT tokens
- **Admin Controls**: Group creation restricted to admin users
- **Typing Indicators**: See when other users are typing
- **Online Status**: View who's currently online in each group
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Message History**: Persistent message storage in MongoDB

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface library
- **Chakra UI** - Modern component library
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client for API requests
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **MongoDB** with **Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Puls-ChatApp.git
   cd Puls-ChatApp
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/puls-chatapp?retryWrites=true&w=majority
   PORT=5000
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   ```

5. **Start the Application**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   node server.js
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📱 Usage

### Getting Started
1. **Register** a new account or **Login** with existing credentials
2. **Create a Group** (admin users only) or **Join existing groups**
3. **Start Chatting** - Send messages, see typing indicators, and online users
4. **Switch Groups** - Navigate between different chat groups from the sidebar

### User Roles
- **Regular Users**: Can join groups and send messages
- **Admin Users**: Can create new groups + all regular user features

### Making a User Admin
To grant admin privileges to a user, update the MongoDB document:
```javascript
db.users.updateOne(
  { email: "user@example.com" }, 
  { $set: { isAdmin: true } }
)
```

## 🌐 Network Access

### Local Network Access
To access from other devices on the same network:

1. **Find your IP address:**
   ```bash
   ipconfig  # Windows
   ifconfig  # Mac/Linux
   ```

2. **Start frontend with host binding:**
   ```bash
   npm run dev -- --host
   ```

3. **Update configuration files:**
   ```javascript
   // frontend/src/utils.js
   export const apiURL = "http://YOUR_IP_ADDRESS:5000";
   export const ENDPOINT = "http://YOUR_IP_ADDRESS:5000";
   ```

4. **Access from other devices:**
   ```
   http://YOUR_IP_ADDRESS:5173
   ```

### Public Access (Using ngrok)
For external access outside your network:

1. **Install ngrok:** https://ngrok.com/
2. **Expose your servers:**
   ```bash
   ngrok http 5173  # Frontend
   ngrok http 5000  # Backend (in separate terminal)
   ```
3. **Update config with ngrok URLs**

## 📁 Project Structure

```
Puls-ChatApp/
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── UserModel.js
│   │   ├── GroupModel.js
│   │   └── ChatModel.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── groupRoutes.js
│   │   └── messageRoutes.js
│   ├── server.js
│   ├── sockets.js
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatArea.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Chat.jsx
│   │   │   └── LandingPage.jsx
│   │   ├── utils.js
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login

### Groups
- `GET /api/groups` - Get all groups
- `POST /api/groups` - Create new group (admin only)
- `POST /api/groups/:groupId/join` - Join a group
- `POST /api/groups/:groupId/leave` - Leave a group

### Messages
- `GET /api/messages/:groupId` - Get group messages
- `POST /api/messages` - Send new message

### Socket Events
- `join room` - Join a chat room
- `new message` - Send message to room
- `typing` - Show typing indicator
- `stop typing` - Hide typing indicator

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MONGO_URI in `.env` file
   - Check MongoDB Atlas network access settings
   - Ensure database user has proper permissions

2. **CORS Errors**
   - Update CORS origin in `server.js` with correct frontend URL
   - Check if both servers are running

3. **Socket Connection Issues**
   - Verify ENDPOINT URL in `utils.js`
   - Check if backend is running on correct port

4. **Authentication Errors**
   - Verify JWT_SECRET is set in `.env`
   - Check if user data exists in localStorage

5. **Port Already in Use**
   - Kill existing processes: `netstat -ano | findstr :5000`
   - Use different ports if needed

## 🚀 Deployment

### Backend Deployment (Railway/Render)
1. Push code to GitHub
2. Connect repository to Railway.app or Render.com
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Update API URLs to production backend
2. Push code to GitHub
3. Connect repository to Vercel.com or Netlify.com
4. Deploy

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

<<<<<<< HEAD
**Abdalmoumen Khahla**
- GitHub: [@abdkh](https://github.com/abdalmoumenkahla)
=======
**Abdul Khalid**
- GitHub: [@abdkh](https://github.com/abdkh)
>>>>>>> c8aaecbb8d3a0e9f5e58907f4b7eedd0e2a88691
- Email: your.email@example.com

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- Chakra UI for beautiful components
- MongoDB for reliable data storage
- React community for amazing ecosystem

---

<<<<<<< HEAD

=======
**⭐ Star this repository if you found it helpful!**

# PULS--Chat-App
Real-time group chat app with React.js, express.js, Socket.IO, and MongoDB. Features instant messaging, user authentication, and group management.
>>>>>>> c8aaecbb8d3a0e9f5e58907f4b7eedd0e2a88691
