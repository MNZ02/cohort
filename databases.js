import express from 'express'
import mongoose from 'mongoose'
const app = express()

app.use(express.json())

mongoose.connect(
  'mongodb+srv://abdulminhaz2:Abdul123@cluster0.cxd433y.mongodb.net/demo'
)

const Users = mongoose.model('Users', {
  name: String,
  email: String,
  password: String
})

app.post('/signin', async (req, res) => {
  const { name, email, password } = req.body

  const existingUser = await Users.findOne({ email })
  
  if(existingUser) {
    res.status(403).send('User already exists!');
    return;
  }

  const user = new Users({
    name: name,
    email: email,
    password: password
  })

  user.save()
  .then(() => {
    res.send('User created successfully');
  })
})



app.listen(3000, () => {
  console.log('Server listening on port 3000')
})
