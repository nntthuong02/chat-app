const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  text: String,
  file:{ data: Buffer,contentType: String, fileName: String},
  user_id: { type: Schema.Types.ObjectId, ref: 'user' },
  group_id: { type: Schema.Types.ObjectId, ref: 'group' },
},
{
    timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);


