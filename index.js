require("dotenv").config();
const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});

//Import route
const authRoute = require('./routes/auth.route');
const storesRoute = require('./routes/store.route');

//Import midleWares
const authMidleware = require('./midlewares/auth.midleware');
const sessionMidleware = require('./midlewares/session.midleware');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views','./views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESION_SECRET));
app.use(cookieParser(process.env.CLOUDINARY_URL));
app.use(sessionMidleware);

// Route auth
app.use('/auth', authRoute);

// Route auth
app.use('/stores', authMidleware.requireAuth, storesRoute);

const listener = app.listen(port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});