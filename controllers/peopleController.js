let { people } = require("../data");
const common = require("../helpers/common");

const getPeople = (req, res) => {
  const mesasge = "All Peoples";
  return common.sendResponse(people, req, res, mesasge);

  //   res.status(200).json({ succes: true, data: people });
};

const createPerson = (req, res) => {
  //code
  const { name } = req.body;
  if (!name) {
    const message = "Please provide name";
    return common.sendError(message, name, res);
  }

  const newPerson = { id: people.length + 1, name };
  people.push(newPerson);

  const message = "New Person created!";
  return common.sendResponse(people, req, res, message);
};

module.exports = { getPeople, createPerson };
