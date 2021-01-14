const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post(
    '/register',
    [
        check('login', 'Login must have more than 5 characters').not().isEmpty().isLength({min: 5}),
        check('email', 'Your email is not valid').not().isEmpty(),
        check('password', 'Your password must be at least 6 characters').not().isEmpty().isLength({min: 6})
    ],
    async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid register data'
            });
        }

        const {login, email, password, avatar} = req.body;

        const candidateLogin = await User.findOne({ login });
        const candidateEmail = await User.findOne({ email });

        if (candidateLogin || candidateEmail) {
            return res.status(400).json({ message: 'Login or email is busy' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({login, email, password: hashedPassword, avatar});

        await user.save();

        res.status(201).json({ message: 'User has been created', email, password: hashedPassword });

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.post(
    '/login',
    [
        check('email', 'Please, enter correct email').isEmail(),
        check('password', 'Please, enter correct password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid register data'
            });
        }

        const {email, password} = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Wrong password, try again' });
        }

        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        );

        res.json({ message: `Your sign up was successful. Welcome, ${user.login}!`, token, userId: user.id });


    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const activeUser = await User.findById(req.params.id)

        res.json(activeUser);

    } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
    }
});


module.exports = router;