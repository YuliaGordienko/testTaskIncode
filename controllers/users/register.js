const { Conflict } = require("http-errors");
const { User } = require("../../modelSchema");
const register = async (req, res) => {
  const { email, password, position, boss } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with email = ${email} already exist`);
  }

  const newUser = new User({ email, position, boss });
  newUser.setPassword(password);

  await newUser.save();
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Register success",
  });
};

module.exports = register;
