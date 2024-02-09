const { app } = require("./app.js");
const { PORT } = require("./constants.js");

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT)
})