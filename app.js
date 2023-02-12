const mongoose = require('mongoose');
const express = require('express')
const apiRoutes = require('./apiRoutes')
const app = express()
app.use(express.json())

// Database Connection
mongoose.connect("mongodb+srv://gajendra0180:gajendra0180@cluster0.nhozuzw.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err))

app.use('/api', apiRoutes)

app.listen(3000, (err, listening) => {
    if (err) throw err;
    console.log("listening on port 3000")
})


