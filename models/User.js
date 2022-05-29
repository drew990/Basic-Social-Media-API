const { model, Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/],
    },
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);
model.export = User;

//         TO DO
// =======================
// thoughts - Array of _id values referencing the Thought model
// friends - Array of _id values referencing the User model (self-reference)

// thoughts: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Thought",
//     },
//   ],
//   friends: {},
