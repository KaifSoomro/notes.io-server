const express = require("express");
const userRouter = express.Router();

const { registration, login, profile } = require("../controllers/usersController.js");

userRouter.post("/registration", registration);
userRouter.post("/login", login);
userRouter.post("/profile", profile);

module.exports = userRouter;