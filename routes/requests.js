const express = require("express");
const handlePromise = require("../helpers/errorHandler");
const {
  createRequest,
  getUserRequests,
  getAllUserRequests,
  updateRequest,
} = require("../helpers/requestSeeder");
const { Notification } = require("../models/notificationModel");
const { User } = require("../models/userModel");
const router = express.Router();

router.post("/create", async (req, res) => {
  let { date, requestUser, targetUser, targetShift } = req.body;
  const [userStatus, user] = await handlePromise(
    User.findById(requestUser._id)
  );
  const [targetUserStatus, targetUserData] = await handlePromise(
    User.findById(targetUser.id)
  );
  let userShift;
  user.shifts.forEach((shift) => {
    if (new Date(shift.date).toDateString() == new Date(date).toDateString()) {
      userShift = shift.shift;
    }
  });
  const [status, data, message] = await createRequest({
    date,
    requestUser: requestUser._id,
    targetUser: targetUser.id,
    targetUserData,
    requestUserData: requestUser,
    userShift,
    targetShift,
  });
  if (status) {
    res.status(200).json({ message });
  } else {
    res.status(500).json({ message });
  }
});

router.get("/get-user-request/:id", async (req, res) => {
  const { id } = req.params;
  const [status, data, message] = await getUserRequests(id);
  if (status) {
    res.status(200).json({ data, message });
  } else {
    res.status(500).json({ message });
  }
});

router.get("/get-all-user-request/", async (req, res) => {
  const [status, data, message] = await getAllUserRequests();
  if (status) {
    res.status(200).json({ data, message });
  } else {
    res.status(500).json({ message });
  }
});

router.patch("/update-request/:id", async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const [status, message] = await updateRequest(id, payload);
  if (payload.approval.status == "Approved") {
    switch (payload.targetShift) {
      case "O":
        try {
          const [requestsStatus, requestUser] = await handlePromise(
            User.findById(payload.requestUser)
          );
          requestUser.shifts.forEach((shift) => {
            if (
              new Date(shift.date).toDateString() ==
              new Date(payload.date).toDateString()
            ) {
              shift.shift = payload.targetShift;
            }
          });
          await handlePromise(
            User.findByIdAndUpdate(payload.requestUser, requestUser)
          );
          let notificationData = {
            userId: payload.requestUser,
            message: `Your request for off Day on ${new Date(
              payload.date
            ).toDateString()} has been Approved`,
            active: true,
          };
          await handlePromise(Notification.create(notificationData));
          res.status(200).json({ message: "Successfully updated Shift" });
        } catch (error) {
          res.status(500).json({ message: "Failed to update Shift" });
        }

        break;

      default:
        try {
          const [targetStatus, targetUser] = await handlePromise(
            User.findById(payload.targetUser)
          );
          const [requestsStatus, requestUser] = await handlePromise(
            User.findById(payload.requestUser)
          );

          targetUser.shifts.forEach((shift) => {
            if (
              new Date(shift.date).toDateString() ==
              new Date(payload.date).toDateString()
            ) {
              shift.shift = payload.userShift;
            }
          });
          requestUser.shifts.forEach((shift) => {
            if (
              new Date(shift.date).toDateString() ==
              new Date(payload.date).toDateString()
            ) {
              shift.shift = payload.targetShift;
            }
          });

          await handlePromise(
            User.findByIdAndUpdate(payload.targetUser, targetUser)
          );
          await handlePromise(
            User.findByIdAndUpdate(payload.requestUser, requestUser)
          );
          //create notification
          let notificationData = {
            userId: payload.requestUser,
            message: `Your request for shift swap with ${
              payload.targetUserData.firstName
            } ${payload.targetUserData.lastName} on ${new Date(
              payload.date
            ).toDateString()} has been Approved`,
            active: true,
          };
          await handlePromise(Notification.create(notificationData));
          res.status(200).json({ message: "Successfully updated Shift" });
        } catch (error) {
          res.status(500).json({ message: "Failed to update Shift" });
        }
        break;
    }
  } else {
    //create notification
    let notificationData = {
      userId: payload.requestUser,
      message: `Your request for shift swap with ${
        payload.targetUserData.firstName
      } ${payload.targetUserData.lastName} on ${new Date(
        payload.date
      ).toDateString()} has been DENIED`,
      active: true,
    };
    await handlePromise(Notification.create(notificationData));
    res.status(200).json({ message: "Successfully updated Shift" });
  }
});
module.exports = router;
