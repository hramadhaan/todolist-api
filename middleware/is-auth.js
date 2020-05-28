const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
        res.status(401).json({
            message: "Token Not Found",
        });
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "somesecretsecrettoken");
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }

    if (!decodedToken) {
        res.status(400).json({
            message: "Not Authenticated",
        });
    }

    req.userId = decodedToken.userId;
    next();
};

// TOKEN : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhhbmlmQGdtYWlsLmNvbSIsInVzZXJJZCI6IjVlY2YzY2QzMjM2ZjgwNDkzMGRkZjljOSIsImlhdCI6MTU5MDY0MTI0NX0.2m39SyY1S98qcyFlk3L5Ogk6RGl2Ab-r9RcNW2Viado