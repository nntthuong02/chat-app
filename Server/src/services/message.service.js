const messageModel = require('../models/message.model')
class messageService{
    createMessage = async (mess)=>{
        return await messageModel.create(mess);
    }
    getMessage = async (group_id) => {
        return await messageModel.find(group_id);
      }
}
module.exports = new messageService