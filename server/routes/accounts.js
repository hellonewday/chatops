const router = require("express").Router();
const controllers = require("../controllers/accounts");
router.get("/", controllers.listUsers);
router.get("/:id", controllers.getUser);
router.post("/", controllers.registerUser);
router.post("/login", controllers.loginUser);
router.patch("/:id");
router.delete("/:id");

module.exports = router;
