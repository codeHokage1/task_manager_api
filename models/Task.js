const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Title must be inputted"]
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Task", taskSchema); 