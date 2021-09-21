const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        require: true,
    },
    // cada task vai pra um user
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    completed: {
        type: Boolean,
        require: true,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

mongoose.model('Task', TaskSchema);



