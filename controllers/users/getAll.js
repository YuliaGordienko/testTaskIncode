const { User } = require("../../modelSchema");
const getAll = async (req, res) => {
  const users = await User.find({});
  const currentUser = req.user;
  const { _id, position } = req.user;
  const subordinates = await User.find({ boss: _id });

  if (position === "user") {
    res.json({
      status: "success",
      code: 200,
      data: {
        currentUser,
      },
    });
  }
  if (position === "admin") {
    res.json({
      status: "success",
      code: 200,
      data: {
        users,
      },
    });
  }
  if (position === "boss") {
    res.json({
      status: "success",
      code: 200,
      data: {
        currentUser,
        subordinates,
      },
    });
  }
};
module.exports = getAll;
