const { Unauthorized, NotFound } = require("http-errors");
const { User } = require("../../modelSchema");
const changeBoss = async (req, res, next) => {
  const { _id, position } = req.user;
  const { id } = req.params;
  const userForChange = await User.findById(id);
  const needFormId = _id.toString().slice();

  if (userForChange.boss !== needFormId) {
    throw new Unauthorized("You do not have those rights");
  }
  const result = await User.findByIdAndUpdate(id, req.body, { new: true });

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

module.exports = changeBoss;
