const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const router = require("./routes/notesRoutes.js");
const userRouter = require("./routes/userRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;
const URL = process.env.MONGODB_URL;

app.use(cors())
app.use(express.json());
app.use(bodyParser.json());

app.use("/notes", router);
app.use("/user", userRouter);

mongoose.connect(URL).then(() => {
    console.log("Connected to MongoDB ✅")
}).catch((error) => console.log(error))

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})