const messageModel = require('../models/message.model')
const mongoose = require('mongoose');
const messageService = require('../services/message.service')
class messageController{
    async create(req, res) {
        try {
            const {text, file, user_id, group_id} = req.body;
            const mess = new messageModel({text,file,user_id,group_id});
            const response = await messageService.createMessage(mess) 
            res.status(200).json(response)
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
    async getMessage(req, res) {
        try {
            var group_id = req.params;
            const response = await messageService.getMessage(group_id) 
            res.status(200).json(response)
        }
        catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new messageController