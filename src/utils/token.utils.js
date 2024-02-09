const jwt = require("jsonwebtoken");
const accessTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokenSecret = process.env.ACCESS_TOKEN_SECRET;

const generateAccessToken = (id, email, password, phone, role) => {
    const payload = { id, email, password, phone, role };
    return jwt.sign(payload, accessTokenSecret, { expiresIn: '3d' });
}

const validateAccessToken = (accessToken) => {
    const payload = jwt.verify(accessToken, accessTokenSecret);
    return payload;
}

const generateRefreshToken = (id, email, password, phone, role) => {
    const payload = { id, email, password, phone, role };
    return jwt.sign(payload, refreshTokenSecret, { expiresIn: '30d' });
}

const validateRefreshToken = (refreshToken) => {
    const payload = jwt.verify(refreshToken, refreshTokenSecret);
    return payload;
}

module.exports = {
    generateAccessToken,
    validateAccessToken,
    generateRefreshToken,
    validateRefreshToken
}