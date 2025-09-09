const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    const token = req.session.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        req.user = decoded;
        next();
    });
};

module.exports = { checkAuth };
