const mongoose = require('mongoose');
const express = require('express')
const app = express()

app.use(express.json())

// Database Connection
mongoose.connect("mongodb+srv://gajendra0180:gajendra0180@cluster0.nhozuzw.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log("connection successful"))
    .catch((err) => console.log(err))

const taskSchema = new mongoose.Schema({
    task: String,
    is_completed: Boolean,
    end_Date: Date,
})
const taskSchemas = new mongoose.model("task", taskSchema)

// APIs Setup
app.listen(3000, (err, listening) => {
    if (err) throw err;
    console.log("listening on port 3000")
})

app.post('/addTask', async (req, res) => {
    const data = req.body
    const task_schema = new taskSchemas({
        task: data.task_name,
        is_completed: false,
        end_Date: data.end_date
    })
    task_schema.save().then((respose) => {
        res.send({ code: 200, data: respose })
    }
    ).catch((err) => {
        res.send({ code: 400, data: err })
    }
    )
})

app.get('/getTasks', async (req, res) => {
    
    const data = taskSchemas.find({ raw: true }, (err, respose) => {
        res.send({ code: 200, data: respose })
    }).limit(10)// setup this limit to apply pagination
})

app.put('/updatedtask', async (req, res) => {
    const data = req.body
    const is_updated = taskSchemas.update({ _id: data._id }, { $set: { task: data.task_name, is_completed: data.is_completed, end_Date: data.end_date } }, (err, respose) => {
        if (err) throw err;
        res.send({ code: 200, data: respose })
    })

})

app.delete('/deleteTask', async (req, res) => {
    const data = req.body
    const is_deleted = taskSchemas.deleteOne({ _id: data._id }, (err, respose) => {
        if (err) throw err;
        res.send({ code: 200, data: respose })
    }
    )
})

