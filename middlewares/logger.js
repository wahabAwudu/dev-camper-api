// @desc logs request to console.
const loggerMiddleWare = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`
  );
  next();
};

module.exports = loggerMiddleWare;
