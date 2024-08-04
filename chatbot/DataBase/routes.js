const express = require('express');
const router = express.Router();
const SchemaController = require('./SchemaController');


router.post('/login', SchemaController.Login);

router.post('/signup', SchemaController.SignUp);

router.get('/chats/:userID', SchemaController.sendChats);

router.post('/createchat', SchemaController.createChat);

router.get('/loaddetails/:chatID', SchemaController.LoadDetails);

router.get('/storequestgetans', SchemaController.storequestgetans);

router.post('/updateTitle', SchemaController.updateTitle);

module.exports = router;