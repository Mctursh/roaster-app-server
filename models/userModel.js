require('dotenv').config()
const mongoose = require("mongoose");
const { scheduleSchema } = require("./scheduleSchema");

//connecting to mongoose server
mongoose.connect(`mongodb+srv://admin-ayoade:${process.env.MONGO_PASSWORD}@cluster0.4d1r2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
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
