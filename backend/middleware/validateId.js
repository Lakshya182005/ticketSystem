const mongoose = require("mongoose");

const validateId = () => {
  return (req, res, next) => {
    const value = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    next();
  };
};

module.exports = { validateId };
