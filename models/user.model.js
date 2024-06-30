const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  city: { type: String, required: true },
  password : { type: String, required: true }
});

//token generator
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
  return token;
};

module.exports = mongoose.model('User', userSchema);
