const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const nearuser = require('./routes/nearuser')
const updateloc = require('./routes/updateloc')
const userChatRoutes = require('./routes/userChatRoutes')
const userPayRoutes = require('./routes/userPayRoutes')
const User = require('./models/user')
const cors = require('cors');
const profileRoutes = require('./routes/profile')


const app = express();

app.use(cors());

passport.use(
  new LocalStrategy(async(username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      
      const match = await bcrypt.compare(password,user.password);
      
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      };
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

const isAuthenticated = (req,res,next)=>{
    if(req.user)  return next();
    res.redirect('/api/v1/log-in');
}
  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.set("views", "./views");
app.set("view engine", "pug");

app.get('/',(req,res)=>{
  if(req.user){
    res.render('index',{ 
      value:"Log-Out",
      link:'/api/v1/log-out',
    });
    return;
  }
  res.render('index',{ 
    value:"Log-In",
    link:'/api/v1/log-in'
  });
    
    // res.status(200).json({user: req.user});
})


app.use('/api/v1/nearby-users',isAuthenticated,nearuser);

app.use('/api/v1/update-location',isAuthenticated,updateloc);
app.use('/api/v1/chat',userChatRoutes);
app.use('/api/v1/pay',userPayRoutes);
app.use('/api/v1/profile',isAuthenticated,profileRoutes);

app.get('/api/v1/register', (req,res)=>{
    res.render('sign-up');
})

app.post('/api/v1/register', async (req, res) => {

    try {
        const user = new User({
            name: req.body.name,
            email: req.body.username,
            mob: req.body.phone,
            password: req.body.password
        });
        user.password =  await bcrypt.hash(user.password,10);
        const result = await user.save();
        res.redirect("/api/v1/log-in");
    } catch (error) {
        console.log(error);
        res.status(500).send('Error registering user');
    }

});


app.get('/api/v1/nearUsers',isAuthenticated,(req,res)=>{
  res.redirect('/nearUsers.html');
});

app.get('/api/v1/nearPlaces',isAuthenticated,(req,res)=>{
  res.redirect('/nearPlaces.html');
});


app.get('/api/v1/log-in', (req,res)=>{
    res.render('log-in');
});
app.post(
    "/api/v1/log-in",
    passport.authenticate("local", {
      successRedirect: "/api/v1/nearUsers", // nearuser.html
      failureRedirect: "/api/v1/log-in"
    })
);

app.get("/api/v1/log-out", (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.cookie('userId', '', {
        sameSite: 'None',
        secure: true // Ensure HTTPS for 'SameSite=None'
    });
      res.redirect("/");
    });
});


module.exports = app;