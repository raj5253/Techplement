const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  author: {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true }
  },
  quote: { type: String, required: true }
});

module.exports = mongoose.model('Quote', quoteSchema);
