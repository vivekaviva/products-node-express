//Logger Middleware
const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  console.log("logger - ", method, url, year, month);
  next();
};

module.exports = logger;
