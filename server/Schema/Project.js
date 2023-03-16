const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: String,
  state: String,
  description: String,
  date: String,
})

module.exports = mongoose.model('project', UserSchema)
