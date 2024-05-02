import express from 'express'
import { v4 as uuidv4 } from 'uuid'
const app = express()

let arr = []
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Todos')
})

app.get('/todos', (req, res) => {
  res.json(arr)
})

app.get('/todos/:id', (req, res) => {
  const { id } = req.params
  console.log(id)

  const todo = arr.find(todo => todo.id === id)
  if (todo) {
    res.json(todo)
  } else res.status(404).send('Todo not found')
})

app.post('/todos', (req, res) => {
  const { title, description } = req.body
  const id = uuidv4()
  arr.push({ id, title, description })
  res.send('Todo added succesfully')
})

app.put('/todos/:id', (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  const index = arr.findIndex(todo => todo.id === id)

  if (index !== -1) {
    arr[index] = { id, title, description }
    res.send('Todo updated succesfully')
  } else res.status(404).send('Todo not found')
})

app.delete('/todos/:id', (req,res) => {
  const {id} = req.params;

  const index = arr.findIndex(todo => todo.id === id);
  
  arr.splice(index,1) ? res.send('Deletion successfull') : res.status(404).send('Error deleting todo')
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
