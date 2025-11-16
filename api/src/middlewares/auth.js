const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    try {
        let token = req.headers["authorization"] || "";

        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Remove "Bearer "
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trim();
        }

        console.log("Verifying token:", token);
        const data = jwt.verify(token, process.env.JWT_SECRET);

        if (!data) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.user = { _id: data._id };

        next();

    } catch (ex) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = auth;