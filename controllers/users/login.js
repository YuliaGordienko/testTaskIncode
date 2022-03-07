const { NotFound, Unauthorized, BadRequest } = require("http-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../../modelSchema");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.comparePassword(password)) {
    throw new BadRequest("Wrong email or password");
  }
  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1000h",
  });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};
module.exports = login;
