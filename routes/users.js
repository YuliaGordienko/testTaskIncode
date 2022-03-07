const express = require("express");
const {
  controllerWrapper,
  authenticate,
  validation,
} = require("../middlewares");
const { joiSchema } = require("../modelSchema/user");

const router = express.Router();
const { users: ctrl } = require("../controllers");
router.post(
  "/register",
  validation(joiSchema),
  controllerWrapper(ctrl.register)
);
router.post("/login", validation(joiSchema), controllerWrapper(ctrl.login));
router.get("/logout", authenticate, controllerWrapper(ctrl.logout));
router.get("/current", authenticate, controllerWrapper(ctrl.current));
router.get("/all", authenticate, controllerWrapper(ctrl.getAll));
router.get("/:id", authenticate, controllerWrapper(ctrl.getUserById));
router.put("/change/:id", authenticate, controllerWrapper(ctrl.changeBoss));
module.exports = router;
