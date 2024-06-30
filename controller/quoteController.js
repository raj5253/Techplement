const mongoose = require('mongoose');
const Quote = require('../models/quote.model');


const getRandomQuote = async (req, res) => {
    try {
        const count = await Quote.countDocuments();
        const random = Math.floor(Math.random() * count);
        const quote = await Quote.findOne().skip(random);
        res.json(quote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const addQuote = async (req, res) => {
    try {
        const { quote } = req.body;

        if (!quote) {
            return res.status(400).json({ error: 'Quote is required' });
        }
        const newQuote = new Quote({
            author: { user_id: req.user._id, name: req.user.name },
            quote
        });
        await newQuote.save();
        res.status(201).json(newQuote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const updateQuote = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const existingQuote = await Quote.findById(req.params.id);

        if (!existingQuote) {
            return res.status(404).json({ message: 'Quote not found' });
        }

        if (existingQuote.author.user_id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        existingQuote.quote = req.body.quote;
        existingQuote.date = new Date();

        const updatedQuote = await existingQuote.save();

        res.status(200).json(updatedQuote);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const deleteQuote = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const quote = await Quote.findOneAndDelete({
            _id: req.params.id,
            'author.user_id': req.user._id
        });

        if (!quote) {
            return res.status(404).json({ message: 'Quote not found or not authorized' });
        }

        res.status(200).json({ message: 'Quote deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const searchByAuthor = async (req, res) => {
    try {
        const { author } = req.query;
        const quotes = await Quote.find({ 'author.name': new RegExp(author, 'i') });
        res.json(quotes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports = {
    getRandomQuote,
    addQuote,
    updateQuote,
    deleteQuote,
    searchByAuthor
}


