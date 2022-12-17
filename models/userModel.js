const mongoose = require("mongoose");
const { scheduleSchema } = require("./scheduleSchema");

//connecting to mongoose server
mongoose.connect("mongodb://localhost:27017/roaster-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//definning the schema forthr user collections
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
  },
  role: {
    type: String,
    default: "User",
  },
  shifts: {
    type: [scheduleSchema],
  },
});
// shifts: [ Schedule ]

const User = mongoose.model("User", userSchema);

//exporting the model for use in other part of the project
module.exports = { User };
