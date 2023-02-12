const express = require('express')
const UserController = require('../http/controllers/index.js')
const router = express.Router()

router.post('/addTask', async (req, res) => {
    UserController.addTask(req, res);
})

router.get('/getTasks', async (req, res) => {
    UserController.getTasks(req, res);
})

router.put('/updatedtask/:id', async (req, res) => {
    UserController.updatedtask(req, res);
})

router.delete('/deleteTask', async (req, res) => {
    UserController.deleteTask(req, res);
})

router.get('/exportAsCSV', async (req, res) => {
    UserController.exportAsCSV(req, res);
})




module.exports = router