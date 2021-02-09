exports.successResponse = (data, message, success) => ({
  data: data || null,
  success: success || false,
  message: message || "Success",
});

exports.errorResponse = (message) => ({
  success: false,
  message: message || "Error Occured",
});
