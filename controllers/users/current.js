const { User } = require("../../modelSchema");
const current = async (req, res, next) => {
  const { _id } = req.user;
  await User.findById(_id);
  res.json({
    status: "success",
    code: 200,
    data: {
      email: req.user.email,
    },
  });
};
module.exports = current;
