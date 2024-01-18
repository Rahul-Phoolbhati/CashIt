const User = require('../models/user');
const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router()


router.route('/').post('/api/register', (req, res) => {
    const { username, lat, lon } = req.body;
    User.insertOne({ username, email, lat, lon }, (err, result) => {
      if (err) {
        console.error('Error registering user:', err);
        res.status(500).send('Error registering user');
      } else {
        res.status(201).json({ user });
      }
    });
});