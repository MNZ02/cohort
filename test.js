import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

mongoose
  .connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/test')
  .then(() => {
    console.log('Connected to database')
  })

const Users = mongoose.model('Users', {
  name: String,
  email: String,
  password: String
})

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    res.status(400).send('Name, email and password are required')
  }

  const existingUser = await Users.findOne({ email })

  if (existingUser) {
    res.status(403).send('User already exists')
  } else {
    const user = new Users({ name, email, password })
    user.save()
    res.send('User created successfully')
  }
})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400).send('Email and password are required')
  }

  const user = await Users.findOne({ email })

  if (!user) {
    res.status(404).send('User not found')
  }

  if (user) {
    if (user.password === password) {
      res.status(200).send('User logged in successfully')
    } else {
      res.status(403).send('Invalid password')
    }
  }
})

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
