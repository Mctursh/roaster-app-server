const mongoose = require("mongoose");

//connecting to mongoose server
mongoose.connect(`mongodb+srv://admin-ayoade:${process.env.MONGO_PASSWORD}@cluster0.4d1r2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//definning the schema forthr user collections
const requestSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  targetShift: {
    type: String,
  },
  targetUser: {
    type: String,
  },
  userShift: {
    type: String,
  },
  targetUserData: {
    type: Object,
  },
  requestUserData: {
    type: Object,
  },
  requestUser: {
    type: String,
  },
  approval: {
    status: {
      type: String, // Pending, Declined or Approved,
      default: "Pending",
    },
    date: {
      type: Date,
      default: "",
    },
    approvalAdminData: {
      type: Object,
      default: "",
    },
  },
});

const Request = mongoose.model("Request", requestSchema);

//exporting the model for use in other part of the project
module.exports = { Request, requestSchema };
