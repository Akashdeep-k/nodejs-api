const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("express-async-handler");
const { generateAccessToken, generateRefreshToken } = require("../utils/token.utils");

const User = require("../models/user.models");

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().sort({ time: -1 });
    res.json(new ApiResponse(200, users));
});

const getUserById = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    res.json(new ApiResponse(200, user));
});

const createUser = asyncHandler(async (req, res) => {
    const { name, email, phone, password } = req.body;
    const user = await User.create({ name, email, phone, password });

    const accessToken = generateAccessToken(user._id, user.email, user.phone, user.password, user.role);
    const refreshToken = generateRefreshToken(user._id, user.email, user.phone, user.password, user.role);

    user.token = accessToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });
    res.status(201);
    res.json(new ApiResponse(201, user));
});

const updateUser = asyncHandler(async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedupdates = ["name", "email", "phone", "password"];
    const validUpdates = updates.every(update => allowedupdates.includes(update));

    if (!validUpdates) {
        res.status(400);
        throw new Error("Invalid updates requested");
    }

    updates.forEach((update) => {
        req.user[update] = req.body[update];
    });
    await req.user.save();

    res.send(req.user);
});

const deleteUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId).select({ name: 1, email: 1 });
    if (!user) {
        res.status(400);
        throw new Error("User not found");
    }
    res.json(new ApiResponse(200, { message: "User deleted" }));
});

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};