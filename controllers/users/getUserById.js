const createError = require("http-errors");
const { User } = require("../../modelSchema");
const getUserById = async (req, res, next) => {
  const { id } = req.params;
    const result = await User.findById(id);
   
  if (!result) {
    throw new createError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};
module.exports = getUserById;
