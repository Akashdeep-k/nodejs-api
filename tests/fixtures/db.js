const mongoose = require("mongoose");
const User = require("../../src/models/user.models");

const { generateAccessToken } = require("../../src/utils/token.utils.js");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "mike",
    email: "mike@example.com",
    phone: "+91 1234567890",
    password: "mypasswd",
    role: "admin",
    token: generateAccessToken(userOneId, "mike@example.com", "mypasswd", "+91 1234567890", "admin")
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "john",
    email: "john@example.com",
    phone: "+91 0987654321",
    password: "myhostel077",
    role: "user",
    token: generateAccessToken(userTwoId, "john@example.com", "myhostel077", "+91 0987654321", "user")
};

const setupDatabase = async () => {
    await User.deleteMany();
    await new User(userOne).save();
    await new User(userTwo).save();
}

module.exports = {
    setupDatabase,
    userOneId,
    userOne,
    userTwoId,
    userTwo,
}