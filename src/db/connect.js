const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

const connectToDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(uri);
        console.log("Successfully connected to database");
        // console.log(connectionInstance);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
};

module.exports = connectToDB;