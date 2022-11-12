const TaskModel = require('../models/Task')

exports.getAllTasks = async (req, res) => {
    const allTasks = await TaskModel.find({})
    
    res.json({
        "tasks": allTasks
    })
}

exports.getOneTask = async (req, res) => {
    const id = req.params.id;
    const foundTask = await TaskModel.findById(id).exec();
    
    if (!foundTask) {
        return res.json({
            "message": `Task with id ${id} found`
        })
    }
    res.json({
        "tasks": foundTask
    })

}

exports.createTask = async (req, res) => {
    const newTask = req.body;
    if (!newTask.title) {
        return res.json({
            "message": "Task must have a title"
        })
    }
    const task = await TaskModel.create(newTask);
    res.status(201).json({
        "message": `Created Task`,
        "task": task
    })
}

exports.updateTask = async (req, res) => {
    try {
        const updates = req.body;
        const id = req.params.id;

        const foundTask = await TaskModel.findById(id);
        if(!foundTask) return res.status(404).json({
            "error": `Task with id ${id} not found`
        })
        const task = await TaskModel.findOneAndUpdate(
            {
                _id: id,
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        )
        res.json({
            "message": "Task updated successfully",
            updatedTask: task
        })
    } catch (error) {
        res.status(500).json({
            "error": err.message
        })
            
    }
}

exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    await TaskModel.findByIdAndDelete(id);
    res.json({ "message": "Task deleted" })
}
