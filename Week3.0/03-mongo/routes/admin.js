const express = require('express')
const { Router } = express;
const adminMiddleware = require("../middleware/admin");
const { Course, Admin } = require('../db/index.js')
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Invalid credentials')
  }

  try {

    const admin = await Admin.create({
      username: username,
      password: password
    })
    if (!admin) return res.status(403).send('Error creating admin')
    res.status(201).send('Admin created succesfully')
  } catch (error) {
    res.status(500).send('Interal server error')
  }
});

router.post('/courses', adminMiddleware, async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  if (!title || !description || !price) {
    res.status(400).send('All fields are required')
  }
  try {
    const course = await Course.create({
      title: title,
      description: description,
      price: price,
      imageLink: imageLink
    })

    res.status(201).json({ message: 'Course created', courseId: course._id })

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message })
  }
});

router.get('/courses', adminMiddleware, async (req, res) => {
  try {
    const course = await Course.find()
    if (!course) {
      res.status(403).send('Error finding courses');

    }
    res.status(200).json({ courses: course })
  } catch (error) {
    return res.status(500).send('Internal server error');

  }

});

module.exports = router;
