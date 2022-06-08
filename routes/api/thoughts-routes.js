const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  deleteThought,
  updateThought,
  ThoughtReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller.js");

router.route("/").get(getAllThoughts).post(createThoughts);

router
  .route("/:id")
  .get(getThoughtsById)
  .delete(deleteThought)
  .put(updateThought);

router.route("/:thoughtId/reaction").post(ThoughtReaction);

router.route("/:thoughtId/reaction/:reactionId").delete(deleteReaction);

module.exports = router;
