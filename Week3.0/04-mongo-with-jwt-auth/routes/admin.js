const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require('../db')
const jwt = require('jsonwebtoken')
const secret = 'Thisisasecret'
const router = Router();

module.exports = {
  secret: 'Thisisasecret'
}
// Admin Routes
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send('Invalid credentials')
  }
  const admin = await Admin.create({
    username: username,
    password: password
  })
  res.status(201).json({ message: 'Admin created succesfully', admin })

});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send('Invalid credentials')
  }
  const admin = await Admin.findOne({
    username: username,
  })
  if (admin) {
    const token = jwt.sign({ username: username }, secret)
    res.status(200).json({ token })
  }
  else {
    res.status(401).send('Invalid credentials')
  }


});

router.post('/courses', adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  // zod
  const newCourse = await Course.create({
    title,
    description,
    imageLink,
    price
  })

  res.json({
    message: 'Course created successfully', courseId: newCourse._id
  })
});

router.get('/courses', adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});

  res.json({
    courses: response
  })

});


module.exports = router;
