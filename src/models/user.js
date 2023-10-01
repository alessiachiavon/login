const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: String,
    password: String,
    role: {type: String, default: 'user'},
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: false
      }
});

const User = mongoose.model('Usuario', userSchema);

module.exports = User;