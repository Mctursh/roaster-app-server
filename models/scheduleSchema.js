require('dotenv').config()
const mongoose = require("mongoose")

//connecting to mongoose server
mongoose.connect(`mongodb+srv://admin-ayoade:${process.env.MONGO_PASSWORD}@cluster0.4d1r2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true});

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