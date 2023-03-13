const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email: String,
    username: String,
    contact: String,
    address: String,
    image: String,
    education: String,
    createdby: mongoose.Schema.Types.ObjectId,
});

module.exports = mongoose.model("employee", UserSchema);
