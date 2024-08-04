// Initiate the server and connect to the database
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes.js');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//LQxkqxkiNi1scv9Z
const uri = 'mongodb+srv://kysha1004:LQxkqxkiNi1scv9Z@dmvchatbot01.f1u1prb.mongodb.net/?retryWrites=true&w=majority&appName=dmvchatbot01';
// const databaseName = 'ChatBotDomestic';

// mongoose
//   .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: databaseName })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error(err));

 
mongoose.connect(uri)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error(err));
 
//app.use('/api/Cardsimages', express.static(path.join(__dirname, '../Database/Cardsimages')));
app.use('/api', router);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});