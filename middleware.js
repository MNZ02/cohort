import express from 'express'
import {z} from 'zod';
const app = express();

// const schema = z.array(z.number());

// // const middleware = (req, res, next) => {
// //     next();
// // }

// // app.use(middleware);
app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hi!')
    console.log('Route called');
})

// app.get('/about', (req,res) => {
//     res.send('About');
//     console.log('About route called');
// })

// app.get('/health-checkup', (req,res) => {
//     res.send('Health Checkup');
// })

// app.post('/health-checkup' , (req,res) => {
//     const kidneys = req.body.kidneys;
//     const response = schema.safeParse(kidneys);
//     const kidneyLength = kidneys.length;

//    res.json({
//          success: response.success,
    
//    })
// })


// app.use((err,req,res,next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//     errorCount++;
// })


function validate(obj) {
    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    const response = schema.safeParse(obj);
    console.log(response);
    return response;   
}

app.post('/login', (req,res) => {

    const response = validate({
        email: 'abc@gmail.com',
        password: '12456'
    });
    console.log(response); 

    if(!response.success) {
        res.status(400).json({
            success: false,
            message: 'Invalid input'
        })
    } 
    else {
        res.status(200).json({
            success: true,
            message: 'Valid input'
        })
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});