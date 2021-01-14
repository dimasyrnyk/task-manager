const {Router} = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.get('/filter/:value', auth, async (req, res) => {
    try {
        const users = await User.find({ email: { $regex: new RegExp(req.params.value, 'gim')} });

        res.json(users);

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });

        res.json(user);

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});


module.exports = router;