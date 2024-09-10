module.exports = {
  sendResponse: (data, req, res, message = null) => {
    try {
      return res
        .status(200)
        .json({ status: true, message: message, data: data });
    } catch (error) {
      throw error;
    }
  },
  sendError: (message, data, res) => {
    try {
      return res
        .status(500)
        .json({ status: false, mesasge: message, data: data });
    } catch (error) {
      throw error;
    }
  },
};
