const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },

    password: {
        type: String,
        required: true,
        // pra quando a gente fazer uma query nao aparecer
        select: false,
    },

    // SE A GENTE QUISSESSE FAZER CONFIRMACAO DO EMAIL
// confirmed: {
//   type: Datatypes.BOOLEAN,
//   defaultValue: false,
// },

    passwordResetToken: {
        type: Date,
        select: false,
    },

    passwordResetExpires: {
        type: Date,
        select: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// antes de salvar vamos encriptar a senha, com 10 rounda de hash
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});

mongoose.model('User', UserSchema);



