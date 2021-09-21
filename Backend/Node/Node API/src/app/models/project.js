const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },

    description: {
        type: String,
        require: true
    },

    // cada projeto tem um user 
    // aqui é user mesmo(objeto), diferente do sql que seria user_id referenciando esse campo da outra tabela

    /// estranho q daomostrou erro quando o diego criou sem user, n sei pq 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    // cada projeto tem varias tasks
    tasks: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

mongoose.model('Project', ProjectSchema);



