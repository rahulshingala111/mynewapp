const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    email: String,
    role: String,
});

module.exports = mongoose.model("user", UserSchema);
