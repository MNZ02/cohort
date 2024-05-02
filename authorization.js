import express from 'express';
import jwt from 'jsonwebtoken';
const app = express();

app.use(express.json());

const jwtPassword = '123456';

const users = [
    {
        username: 'ahkki',
        email: 'hakki@gmail.com',
        password: '123'
    },
    {
        username: 'mehnaz',
        email: 'mehanz@gmail.com',
        password: '321'
    },
    {
        username: 'minhaz',
        email: 'minhaz@gmail.com',
        password: 'abc'
    }
]

function userExists(username,password) {
    const user = users.find(user => user.username === username && user.password === password);

    if(user) return true;
    else return false;
}

app.post('/signin', (req,res) => {
    const {username,password} = req.body;

    if(!userExists(username,password)) {
        res.status(403).send('User not found');
    }
    let token = jwt.sign({username: username}, jwtPassword);

    return res.json({
        token
    })
})

app.get('/users', (req,res) => {
    const {authorization: token} = req.headers;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        
        const newUsers = users.filter(user => user.username !== username);

        res.json({
            users: newUsers
        })
        
    } catch (error) {
        res.status(403).send('Invalid token');
    }
})


app.listen(3000, () => {
    console.log('Server running on port 3000');
})