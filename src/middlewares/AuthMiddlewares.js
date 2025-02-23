const jwt = require("jsonwebtoken");
// const { jwtSecretKey } = require("../configs/jwtConfig");
const { BadRequestError } = require("../core/ApiError");

const jwtSecretKey = process.env.jwtSecretKey;

const isLoggedIn = async(req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        throw new BadRequestError("Please login to continue");
    }
    try {
        const { userId } = jwt.verify(token, jwtSecretKey);  // Match with the login JWT payload
        req.userId = userId;
        return next();
    } catch (error) {
        throw new BadRequestError("Invalid token request");
    }
};

module.exports = {isLoggedIn};
