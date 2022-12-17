const { Request } = require("../models/requestSchema");
const handlePromise = require("./errorHandler");

const createRequest = async (newRequest) => {
  const [createRequestStatus, RequestStatusData] = await handlePromise(
    Request.create(newRequest)
  );
  console.log(RequestStatusData);
  if (createRequestStatus) {
    return [
      createRequestStatus,
      RequestStatusData,
      `Successfully created request`,
    ];
  } else {
    return [createRequestStatus, RequestStatusData, "Failed to create request"];
  }
};

const getUserRequests = async (id) => {
  const [status, data] = await handlePromise(Request.find({ requestUser: id }));
  if (status && data.length) {
    return [true, data, "Successfully fetched all user request"];
  } else {
    return [false, data, "Failed to fetched all user request"];
  }
};

const getAllUserRequests = async () => {
  const [status, data] = await handlePromise(Request.find());
  if (status) {
    return [true, data, "Successfully fetched all user request"];
  } else {
    return [false, data, "Failed to fetched all user request"];
  }
};

const updateRequest = async (id, data) => {
  const [status] = await handlePromise(Request.findByIdAndUpdate(id, data));
  if (status) {
    return [true, "Successfully updated request"];
  } else {
    return [false, "Failed to update request"];
  }
};

module.exports = {
  createRequest,
  getUserRequests,
  getAllUserRequests,
  updateRequest,
};
