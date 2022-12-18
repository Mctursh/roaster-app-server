const mongoose = require("mongoose");
const { scheduleSchema } = require("./scheduleSchema");

//connecting to mongoose server
mongoose.connect("mongodb://localhost:27017/roaster-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//definning the schema forthr user collections
const notificationSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  message: {
    type: String,
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  active: {
    type: Boolean,
  },
});
// shifts: [ Schedule ]

const Notification = mongoose.model("Notification", notificationSchema);

//exporting the model for use in other part of the project
module.exports = { Notification };
