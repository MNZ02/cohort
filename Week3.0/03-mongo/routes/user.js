const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const mongoose = require('mongoose')

// User Routes
router.post('/signup', async (req, res) => {
  // Implement user signup logic
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send('Invalid credentials')
  }

  try {
    const user = await User.create({
      username: username,
      password: password
    })

    res.status(201).json({ message: 'User created successfully', user })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }
});

router.get('/courses', async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await Course.find()
    res.status(200).json({ courses })
  } catch (error) {

    res.status(500).send('Internal server error', error.message)
  }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId
  const username = req.headers.username

  const updatedCourses = await User.updateOne({
    username: username
  }, {
    "$push": {
      purchasedCourses: courseId
    }
  })
  res.json({ message: "purchase Complete", updatedCourses })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  try {
    const { username } = req.headers;
    const user = await User.findOne({
      username: username
    })

    if (user) {
      const purchasedCourse = await Course.find({
        _id: {
          "$in": user.purchasedCourses
        }
      })
      res.json({
        courses: purchasedCourse
      })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message })
  }

}); module.exports = router
