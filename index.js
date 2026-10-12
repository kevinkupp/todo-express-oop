import express from 'express'

const app = express()
app.use(express.json())

app.get('/json-test', (req, res) => {
    res.send({
        message: 'json test ok'
    })
})

app.listen(3009, () => {
    console.log('Express app is running at http://localhost:3009')
})