var express = require("express");
const { generateEmail, generatePassword } = require("../helpers/userHelper");
const {
  createUser,
  createAdmin,
  updateSchedule,
  findUserById,
} = require("../helpers/userSeeder");
var router = express.Router();
const moment = require("moment");
const { User } = require("../models/userModel");
const handlePromise = require("../helpers/errorHandler");

/* GET users listing. */

router.get("/", async (req, res) => {
  const [status, data] = await handlePromise(User.find({ role: "User" }));
  if (status) {
    res.status(200).json({ data, message: "Successfully fetched users" });
  } else {
    res.status(500).json({ data, message: "Failed to fetch users" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const [status, user, message] = await findUserById(id);
  if (status) {
    res.status(200).json({ user, message });
  } else {
    res.status(404).json({ user, message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const [status, data] = await handlePromise(User.deleteOne({ _id: `${id}` }));
  if (status) {
    res.status(200).json({ message: "Successfully Deleted User" });
  } else {
    res.status(500).json({ message: "failed to delete user" });
  }
});

router.post("/create", async function (req, res, next) {
  const { firstName, lastName, type } = req.body;
  const genEmail = generateEmail(firstName, lastName);
  const genPassword = generatePassword();
  const [status, data, message] = await createUser(
    firstName,
    lastName,
    genEmail,
    genPassword,
    type
  );
  if (status) {
    // const { password, ...dataToSend } = data.toJSON();
    res.status(200).json({ data, message });
  } else {
    res.status(400).json({ message });
  }
});

router.post("/create-admin", async function (req, res, next) {
  const [status, data, message] = await createAdmin();
  if (status) {
    res.status(200).json({ data, message });
  } else {
    res.status(400).json({ message });
  }
});

router.post("/generate-shift", async (req, res) => {
  const [status, message] = await updateSchedule();
  if (status) {
    res.status(200).json({ message });
  } else {
    res.status(400).json({ message });
  }
});

// router.get('/get-user-shift/:id', async(req, res) => {
//   const { id } = req.params
//   // const [status,]
// })

module.exports = router;
