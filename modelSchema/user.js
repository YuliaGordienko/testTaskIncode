const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const emailRegex =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const userSchema = Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegex,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      enum: ["admin", "boss", "user"],
    },
    boss: {
      type: String,
      required: [true, "Boss is required"],
    },

    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const joiSchema = Joi.object({
  email: Joi.string(),
  password: Joi.string(),
  position: Joi.string(),
  boss: Joi.string(),
});
const User = model("user", userSchema);
module.exports = {
  User,
  joiSchema,
};
