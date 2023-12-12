const userModel = require("../models/user.model");
class authService {
  createUser = async (user) => {
    return await userModel.create(user);
  };
  getAllUsers = async () => {
    return await userModel.find();
  };
  getOneUser = async (email) => {
    return await userModel.findOne({ email });
  };
  getUser = async (userId) => {
    return await userModel.findById(userId);
  };
  updateOnline = async (userId, isOnline) => {
    return await userModel.findByIdAndUpdate(userId, {
      $set: { isOnline: isOnline },
    });
  };
  updateProfile = async (
    user_id,
    name,
    numberPhone,
    address,
    avatar,
    email
  ) => {
    return await userModel.findByIdAndUpdate(
      user_id,
      {
        name: name,
        numberPhone: numberPhone,
        address: address,
        avatar: avatar,
        email: email,
      },
      { new: true }
    );
  };
}
module.exports = new authService();
