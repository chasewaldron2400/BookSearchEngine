const {
  createUser,
  login,
  saveBook,
} = require("../controllers/user-controller");
const { User, Book } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getSingleUser: async (parent, args) => {
      const foundUser = await User.findOne({
        $or: [
          { _id: args.user ? args.user._id : args.id },
          { username: args.username },
        ],
      });

      if (!foundUser) {
        return { message: "Cannot find a user with this id!" };
      }
      return foundUser;
    },
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      if (!user) {
        return { message: "Something is wrong!" };
      }
      const token = signToken(user);
      return { token, user };
    },
  },
  login: async (parent, args) => {
    const user = await User.findOne({
      $or: [{ username: args.username }, { email: args.email }],
    });
    if (!user) {
      return { message: "Can't find this user" };
    }

    const correctPw = await user.isCorrectPassword(args.password);

    if (!correctPw) {
      return { message: "Wrong password!" };
    }
    const token = signToken(user);
    res.json({ token, user });
  },

  deleteBook: async (parent, args) => {
    const updatedUser = await User.findOneAndUpdate(
      { _id: args.user._id },
      { $pull: { savedBooks: { bookId: args.bookId } } },
      { new: true }
    );
    if (!updatedUser) {
      return { message: "Couldn't find user with this id!" };
    }
    return updatedUser;
  },

  saveBook: async (parent, args) => {
    console.log(args.user);
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: args.user._id },
        { $addToSet: { savedBooks: args.body } },
        { new: true, runValidators: true }
      );
      return updatedUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  },
};
module.exports = resolvers;
