const express = require('express')
const tasksRoutes = express.Router();
const taskControllers = require('../controllers/tasksController');


tasksRoutes
    .get('/', taskControllers.getAllTasks)
    .get('/:id', taskControllers.getOneTask)
    .post('/', taskControllers.createTask)
    .patch('/:id', taskControllers.updateTask)
    .delete('/:id', taskControllers.deleteTask)



module.exports = tasksRoutes;