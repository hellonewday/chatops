const router = require("express").Router();
const passport = require("passport");
const controllers = require("../controllers/accounts");

router.get("/", controllers.listUsers);
router.get("/:id", controllers.getUser);
router.post("/", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controllers.editUser
);
router.delete("/:id");

module.exports = router;
