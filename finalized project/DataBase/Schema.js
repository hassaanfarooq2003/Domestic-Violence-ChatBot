const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema  = new Schema({
    userId: { type: Number, unique: true },
    // name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    });

userSchema.plugin(AutoIncrement, { inc_field: 'userId', start_seq: 1 });
const User = mongoose.model('User', userSchema);

const ChatSchema = new Schema({
    userID: { type: Number, required: true },
    chatID: { type: Number, unique: true },
    title: { type: String, required: true }
});

ChatSchema.plugin(AutoIncrement, { inc_field: 'chatID', start_seq: 1 });
const Chat = mongoose.model('Chat', ChatSchema);

const chatDetailsSchema=new Schema({
    chatID:{type:Number,required:true},
    answer:{type:String,required:true},
    question:{type:String,required:true}
})

const ChatDetails=mongoose.model('ChatDetails',chatDetailsSchema);
const mySchemas={User,Chat,ChatDetails};
module.exports=mySchemas;