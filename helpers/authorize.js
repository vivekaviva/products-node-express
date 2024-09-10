const authorize = (req, res, next) => {
  const { user } = req.query;

  if (user === "admin") {
    req.user = { name: "Viveka", role: "admin" };
    next();
  } else if (user === "employee") {
    res.send(`Welcome ${user}`);
  } else {
    res.status(401).send("Unauthorized access");
  }
};

module.exports = authorize;
