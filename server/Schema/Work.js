const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  project: String,
  date: String,
  description: String,
  hour: Number,
  createdBy: String,
})

module.exports = mongoose.model('work', UserSchema)
