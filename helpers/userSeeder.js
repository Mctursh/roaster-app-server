const { User } = require("../models/userModel");
const handlePromise = require("./errorHandler");
const { generateShifts } = require("./userHelper");

const createUser = async (
  firstName,
  lastName,
  email,
  password,
  type,
  role = "User"
) => {
  let newUser = {
    firstName,
    lastName,
    email,
    password,
    type,
    role,
    shifts: []
  };
  const [_, foundData] = await handlePromise(User.find({ email }));
  if (foundData.length) {
    return [false, {}, "User with the details already exist"];
  } else {
    await generateShifts([newUser]);
    const [createUserStatus, userStatusData] = await handlePromise(
      User.create(newUser)
    );
    if (createUserStatus) {
      return [createUserStatus, userStatusData, `Successfully created ${role}`];
    } else {
      return [createUserStatus, userStatusData, "Failed to create user"];
    }
  }
};

const createAdmin = async () => {
  const firstName = "princewill",
    lastName = "emof",
    email = "princewill@ubth.edu.ng",
    password = "$wyM0Hm8",
    role = "Admin",
    type = "Senior registrar";

  return await createUser(firstName, lastName, email, password, type, role);
};

const findUser = async (email, passWord) => {
  const [status, data] = await handlePromise(User.findOne({ email }).lean());
  if (!status) return [false, data, "Internal server error"];
  if (!data) return [false, {} , "User not found"];
  const { password: dbPassword, ...userData } = data;
  if (passWord === dbPassword) {
    return [true, userData, "Successfully found User"];
  } else {
    return [false, {}, "User not found"];
  }
};

const findUserById = async (id) => {
  const [status, data] = await handlePromise(User.findById(id).lean());
  if (status) {
    const { password, ...userData } = data;
    return [status, userData, "Successfully found User"];
  } else {
    return [status, userData, "User not found"];
  }
};

const updateSchedule = async () => {
  try {
    const [status, users] = await handlePromise(User.find({ role: "User" }));
    const updatedShiftsUser = await generateShifts(users);
    let updateStatus = true;
    updatedShiftsUser.forEach(async (user) => {
      try {
        User.findByIdAndUpdate(user._id, { shifts: user.shifts }, (err, docs) => {
          if (err) {
            updateStatus = false;
            throw new Error(`failed to add user shifts, userId:${user._id}`);
          }
        });
      } catch (error) {
        console.log("This is the error", error);
      }
    });
  
    if (updateStatus) {
      return [updateStatus, "Successfully created all user shifts"];
    } else {
      return [updateStatus, "Failed to create shifts"];
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createUser,
  createAdmin,
  findUser,
  updateSchedule,
  findUserById,
};
