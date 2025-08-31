const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const protect = async (req, res, next) => {
    //get the token the user is passing
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            // Extract token from "Bearer TOKEN_HERE"
            token = req.headers.authorization.split(" ")[1];
            console.log("Token:", token);
            
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded:", decoded);
            
            // Get user from database (use userId not id)
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            console.error("Error in auth middleware:", error);
            res.status(401).json({ message: "Not authorized" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (req.user && req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({ message: "Forbidden, admin access only" });
        }
    } catch (error) {
        console.error("Error in isAdmin middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { protect, isAdmin };
