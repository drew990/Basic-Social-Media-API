const UserRoutes = require("./user-routes");
const ThoughtRoutes = require("./thoughts-routes");
const router = require("express").Router();

router.use("/user", UserRoutes);
router.use("/thoughts", ThoughtRoutes);

module.exports = router;
