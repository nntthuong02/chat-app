const mongoose = require('mongoose');
require('dotenv').config();
const ConnectDB = async () => {
    try { 
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chat',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        console.log("MongoDB Connected.")
    }
    catch (error) {
        console.log(error)
    }
}
module.exports = ConnectDB;