const { User } = require("../models");

// Get All Users
const userController = {
  // GET /api/user
  getAllUsers(req, res) {
    User.find()
      .populate("thoughts")
      .populate("friends")
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  //   // populate user friends
  //   .populate({ path: "friends", select: "-__v" })

  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  createUser({ body }, res) {
    User.create(body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(400).json(err));
  },

  // PUT Update user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUser) => {
        if (!dbUser) {
          res.status(404).json({ message: "No User found with this id!" });
          return;
        }
        res.json(dbUser);
      })
      .catch((err) => res.json(err));
  },

  // DELETE Delete a user by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUser) => {
        console.log("ADDING A FRIEND:", dbUser);
        res.json(dbUser);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Remove  friend from a friend list
  // deleteFriend({params}, res) {
  //   User.findOneAndUpdate(
  //     { _id: params.}
  //   )
  // }
};

module.exports = userController;
