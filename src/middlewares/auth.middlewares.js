const User = require("../models/user.models.js")
const asyncHandler = require("express-async-handler");
const { validateAccessToken } = require("../utils/token.utils.js");

const auth = asyncHandler(async (req, res, next) => {
    const accessToken = req.header("Authorization")?.replace("Bearer ", "");
    const refreshToken = req.cookies["refreshToken"];
    if (!accessToken) {
        res.status(401);
        throw new Error("Client is currently logged out");
    }
    const userPayload = validateAccessToken(accessToken);
    const user = await User.findById(userPayload.id);

    if (!user) {
        throw new Error(401);
    }

    req.refreshToken = refreshToken;
    req.user = user;
    next();
});

module.exports = auth;