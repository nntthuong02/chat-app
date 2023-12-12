const groupModel = require("../models/group.model");

class groupService {
  getGroup = async (members) => {
    return await groupModel.findOne({
      // all để xác định cả 2 có trong mảng
      members: { $all: members },
      userCount: 2,
    });
  };
  createGroup = async (group) => {
    return await groupModel.create(group);
  };
  findUserGroup = async (userID) => {
    return await groupModel.find({
      members: { $in: [userID] },
    });
  };
  findGroup = async (firstID, secondID) => {
    return await groupModel.find({
      // all để xác định cả 2 có trong mảng
      members: { $all: [firstID, secondID] },
    });
  };
}
module.exports = new groupService();
