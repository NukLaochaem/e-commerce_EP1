function baseResponse(req, res, next) {
  res.baseJson = (status, message, data = {}) => {
    const response = {
      status: status >= 200 && status < 300 ? "success" : "error",
      statuscode: status,
      data: {
        result: message,
        ...data,
      },
    };
    res.status(status).json(response);
  };
  next();
}

module.exports = baseResponse;
