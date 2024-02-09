const { API_VERSION } = require("./constants.js");
const express = require("express");
const connectToDB = require("./db/connect.js");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const userRouter = require("./routers/user.routers.js");
const { notFoundError, responseError } = require("./middlewares/error.middlewares.js");

const app = express();
; (async () => {
    try {
        await connectToDB();

        app.use(morgan("dev")); // Logs incoming HTTP requests
        app.use(cookieParser()); // Parse cookies in incoming requests
        app.use(express.json()); // Parse incoming JSON data in request bodies
        app.use(express.urlencoded({ extended: false })); // Parse incoming URL-encoded data in request bodies

        app.use(`${API_VERSION}/users`, userRouter);

        app.use(notFoundError); // Handles invalid URLs by generating a 404 error.
        app.use(responseError); // Handles and responds with error details.

    } catch (e) {
        console.log(e);
        process.exit(1);
    }
})();

module.exports = { app };