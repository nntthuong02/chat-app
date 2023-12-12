const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatGroupSchema = new Schema(
  {
    name: { type: String, default: "New Group Chat" },
    avatar: {
      type: String,
      default:
        "https://tse1.mm.bing.net/th?id=OIP.JzfMMdGGxHVW3zepnVulsgHaHw&pid=Api&P=0&h=180",
    },
    userCount: { type: Number, max: 50, default: 2 },
    messCount: { type: Number, default: 0 },
    // userID: Schema.Types.ObjectId,
    members: [{ type: Schema.Types.ObjectId, ref: "user" }],
  },
  {
    timestamps: true,
  }
);

const ChatGroup = mongoose.model("group", chatGroupSchema);

module.exports = ChatGroup;
