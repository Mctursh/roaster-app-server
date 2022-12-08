const mongoose = require("mongoose")

//connecting to mongoose server
mongoose.connect("mongodb://localhost:27017/roaster-app", {useNewUrlParser: true, useUnifiedTopology: true});

//definning the schema forthr user collections
const scheduleSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  shift: {
    type: String,
    required: true
  },
})

// const Schedule = mongoose.model("Schedule", scheduleSchema)

//exporting the model for use in other part of the project
module.exports = { scheduleSchema }