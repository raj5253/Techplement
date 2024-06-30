const User = require('../models/user.model');
const bcrypt = require('bcrypt');


const registerUser = async (req, res) => {
    try {
        const { name, email, city, password } = req.body;
        if (!name || !email || !city || !password) {
            return res.status(400).json({ error: 'Please provide all fields' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, city, password: hashedPassword });
        await user.save();
        const token = user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { registerUser }