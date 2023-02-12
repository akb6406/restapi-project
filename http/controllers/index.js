const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: String,
    is_completed: Boolean,
    end_Date: Date,
})
const taskSchemas = new mongoose.model("task", taskSchema)

module.exports = {
    async addTask(req, res) {
        const data = req.body
        const task_schema = new taskSchemas({
            task: data.task_name,
            is_completed: false,
            end_Date: data.end_date
        })
        task_schema.save().then((respose) => {
            res.send({ code: 201, data: respose })
        }
        ).catch((err) => {
            res.send({ code: 400, data: err })
        }
        )
    },
    async getTasks(req, res) {
        const data = taskSchemas.find({ raw: true }, (err, respose) => {
            res.send({ code: 200, data: respose })
        }).limit(10).select(['task', 'is_completed', 'end_Date'])// setup this limit to apply pagination
    },
    async updatedtask(req, res) {
        const data = req.body
        const is_updated = taskSchemas.update({ _id: req.params.id }, { $set: { task: data.task_name, is_completed: data.is_completed, end_Date: data.end_date } }, (err, respose) => {
            if (err) throw err;
            res.send({ code: 200, data: respose })
        })
    },
    async deleteTask(req, res) {
        const data = req.body
        const is_deleted = taskSchemas.deleteOne({ _id: data._id }, (err, respose) => {
            if (err) throw err;
            res.send({ code: 200, data: respose })
        }
        )
    },
    async exportAsCSV(req, res) {
        const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'CSV file',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
        };

        const data = taskSchemas.find({ raw: true }, { _id: 1, task: 1, is_completed: 1, end_Date: 1 }, async (err, data) => {
            const fs = require('fs')
            // CSV Header
            fs.appendFileSync('./data.csv', `ID\t,task\t,is_completed\t,end_Date\t\n`)
            for (let da of data) {
                fs.appendFileSync('./data.csv', `${da._id}\t,${da.task}\t,${da.is_completed}\t,${da.end_Date}\n`);
            }
            res.send({ code: 200, data: data })
        })
    }
};
