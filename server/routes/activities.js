const express = require("express");
const router = express.Router();
const passport = require("passport");
const activities = require("../controllers/activities");

router.get("/", activities.listActivities);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  activities.addActivity
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  activities.deleteActivity
);

module.exports = router;
