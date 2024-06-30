const express = require('express');
const auth = require('../middleware/auth');
const quoteController = require('../controller/quoteController')
const router = express.Router();

// Get random quote
router.get('/', quoteController.getRandomQuote);

// Add new quote
router.post('/add',auth, quoteController.addQuote);

// Update quote
router.put('/update/:id', auth,quoteController.updateQuote);

// Delete quote
router.delete('/delete/:id',auth, quoteController.deleteQuote);

// Search quotes by author name
router.get('/search',quoteController.searchByAuthor);

module.exports = router;
