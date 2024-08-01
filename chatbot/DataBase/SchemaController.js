const fs = require('fs');
const path = require('path');
const multer = require('multer');
const {User,Chat,ChatDetails} = require('./Schema');



const Login= async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
  
      // If user not found or password is incorrect, return an error
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Store the user data in the local storage
      const userData = {
        userId: user.userId,
        // name: user.name,
        email: user.email
      };
      res.json({ message: 'Login successful from backend', user: userData });
    } catch (err) {
      next(err);
    }
  };
  
  const SignUp = async (req, res, next) => {
    try {
      const {   email, password } = req.body;
      console.log('Signup:', email, password);
  
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
  
      // Create a new user
      const user = new User({  email, password });
      const savedUser = await user.save();
  
      // Log the saved user to check the userId field
      console.log('Saved User:', savedUser);
  
      // Store the user data in the local storage
      const userData = {
        userId: savedUser.userId,
        email: savedUser.email
      };
      res.json({ message: 'Signup successful', user: userData });
    } catch (err) {
      next(err);
    }
  };

  {/*a get command*/}
const sendChats=async(req,res,next)=>{
try{
const userID=req.params.userID;
const chats=await Chat.find({userID}).sort({ChatID:-1}).limit(5).select('chatID title');
const returnchats = chats.map(chat => ({
  chatID: chat.chatID,
  title: chat.title
}));
console.log('Chats:',returnchats);
res.json({message:'Chats sent successfully',chats:returnchats});
}
catch(err)
{
  next(err)
}
};
{/*post command*/}
const createChat = async (req, res, next) => {
  try {
      const { userID, title } = req.body;

      const chat = new Chat({ userID, title });
      const savedChat = await chat.save();
      const sendDetails = {
          chatID: savedChat.chatID,
          title: savedChat.title
      };

      res.json({ message: 'Chat created successfully', chat: sendDetails });
  } catch (err) {
      next(err);
  }
};
{/*get commnad*/}
const LoadDetails=async(req,res,next)=>{
  try{
    const chatID=req.params.chatID;
    const chatdetails=await ChatDetails.find({chatID}).select('question answer');
    console.log('Chat Details:',chatdetails);
    res.json(chatdetails);
  }
  catch(err)
{
  next(err);
}
};

{/*get command*/}
const storequestgetans= async(req,res,next)=>{
  try{
    const {chatID,question}=req.query;
    /*send this question to the python file and get an answer*/
    const answer='answer from python file';
    const chatdetails=new ChatDetails({chatID,question,answer});
    const savedChatDetails=await chatdetails.save();
    console.log('Saved Chat Details:',savedChatDetails);
    res.json({message:'a new qs ans posted call LoadDetails and refresh page'});
  }
  catch(err)
  {
    next(err);
  }
};
{/*post comamnd*/}
const updateTitle = async (req, res, next) => {
  try {
    const { chatID, Title } = req.body;
    const updateQuery = { chatID: chatID };
    const newValues = { $set: { title: Title } };

    await Chat.updateOne(updateQuery, newValues);
    console.log('1 document updated');
    res.json({ message: 'Title updated successfully' });
  } catch (err) {
    next(err);
  }
};
module.exports={Login,SignUp,sendChats,createChat,LoadDetails,storequestgetans,updateTitle};
   