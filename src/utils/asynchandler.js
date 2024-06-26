import ApiResponse from "./api.response.js";

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      res.status(500).json(new ApiResponse(err.statusCode, null, err.message));
      next(err);
    });
  };
};

export { asyncHandler };
