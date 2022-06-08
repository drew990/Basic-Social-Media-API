const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  deleteThought,
  updateThought,
} = require("../../controllers/thoughts-controller.js");

router.route("/").get(getAllThoughts).post(createThoughts);

router
  .route("/:id")
  .get(getThoughtsById)
  .delete(deleteThought)
  .put(updateThought);

// router.route("/:userId");

module.exports = router;
