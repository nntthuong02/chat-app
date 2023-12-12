const groupModel = require("../models/group.model");
const groupService = require("../services/group.service");
class groupController {
  async createGroup(req, res) {
    try {
      const { members } = req.body;
      if (members.length === 2) {
        var group = await groupService.getGroup(members);
        if (group) return res.status(201).json({ id: group });
      }
      const userCount = members.length;
      let name;
      if (userCount > 2) {
        name = req.body.name;
      }
      let newGroup;
      if (name) {
        newGroup = new groupModel({
          members: members,
          userCount: userCount,
          name: name,
        });
      } else {
        newGroup = new groupModel({
          members: members,
          userCount: userCount,
        });
      }
      const response = await groupService.createGroup(newGroup);
      res.status(200).json(response);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async findUserGroup(req, res) {
    try {
      const userID = req.params.userID;
      const groups = await groupService.findUserGroup(userID);
      return res.status(200).json(groups);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  async findGroup(req, res) {
    try {
      const { firstID, secondID } = req.params;
      const groups = await groupService.findGroup(firstID, secondID);
      return res.status(200).json(groups);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}
module.exports = new groupController();
