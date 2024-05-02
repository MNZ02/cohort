import express from 'express';
const app = express();
const port = 3000;

app.use(express.json())

const users = [
    {
        name: 'john',
        kidneys: [{
            healthy: false
        }]
    }
]

app.get('/', (req, res) => {
    let johnKidney = users[0].kidneys;
    let totalKidneys = johnKidney.length;
    let healthyKidneys = 0;

    for (let i = 0; i < johnKidney.length; i++) {
        if (johnKidney[i].healthy) {
            healthyKidneys++;
        }
    }
    const unhealthyKidneys = johnKidney.length - healthyKidneys;

    res.json({ totalKidneys, healthyKidneys, unhealthyKidneys })
})


app.post('/', (req, res) => {
    const { healthy } = req.body;
    console.log(req.body);

    users[0].kidneys.push({
        healthy: healthy
    });
    res.json({
        msg: 'done'
    })
})


app.listen(port, () => {
    console.log('App is listening on port ' + port);
})