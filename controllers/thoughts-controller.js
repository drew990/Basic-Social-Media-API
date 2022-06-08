const { Thoughts, User } = require("../models");

const thoughtController = {
  // GET Gets every single thought made
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // GET Gets a thought by ID
  getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "There is no thought with this ID. ⛔" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST creates a thought

  createThoughts({ params, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // async createThoughts(req, res) {
  //   console.log(req.body);
  //   const user = await User.findOne({ _id: req.body.userId });
  //   console.log("user", user);
  //   user.thoughts.push({
  //     thoughtText: req.body.thoughtText,
  //     username: user.username,
  //     reactions: [],
  //   });

  //   await user.save();

  //   return res.json(user);
  //   Thoughts.create(req.body)
  //     .then(({ _id }) => {
  //       const promise = new Promise((resolve, reject) => {
  //         User.findOneAndUpdate(
  //           { _id: req.body.userId },
  //           { $push: { thoughts: _id } },
  //           { new: true },
  //           (err, doc) => {
  //             if (err) {
  //               reject(err);
  //             } else {
  //               resolve(doc);
  //             }
  //           }
  //         );
  //       });
  //       return promise;
  //     })
  //     .then((dbUserData) => {
  //       console.log("dbUserData", dbUserData);
  //       if (!dbUserData) {
  //         res
  //           .status(404)
  //           .json({ message: "There is no user with this ID. ⛔" });
  //         return;
  //       }
  //       console.log("DB USER DATA: ", dbUserData);
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => res.json(err));
  // },

  // PUT Update a thought
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE a thought
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "There is no thought with this ID. ⛔" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = thoughtController;
