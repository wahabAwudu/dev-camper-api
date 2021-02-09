const successResponse = (data, message, success) => ({
  data: data || null,
  success: success || false,
  message: message || "Success",
});

module.exports = successResponse;
