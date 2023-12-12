const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 5, maxlength: 20 },
    gender: { type: String, default: "male" },
    numberPhone: { type: Number, default: null, unique: true },
    address: { type: String, default: null },
    avatar: {
      type: String,
      default:
        "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png",
    },
    role: { type: String, default: "user" },
    password: { type: String, required: true, minLength: 6, maxLength: 1000 },
    typeLogin: {
      type: String,
    },
    email: { type: String, trim: true, required: true, unique: true },
    friends: { type: Array, default: [] },
    friendsRequest: { type: Array, default: [] },
    friendsRequestWaitAccept: { type: Array, default: [] },
    isOnline: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
