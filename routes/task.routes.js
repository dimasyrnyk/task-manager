const {Router} = require('express');
const config = require('config');
const jwt = require('jsonwebtoken');
const Task = require('../models/Task');
const User = require('../models/User');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/create', auth, async (req, res) => {
    try {

        const {creator, title, priority, deadline, status, checked, users, text} = req.body;

        const task = new Task({creator, title, priority, deadline, status, checked, users, text});

        await task.save();

        await User.updateOne(
            { _id: creator._id },
            { $push: {ownTasks: task._id} }
        );
            console.log('users', users);
        if(users.length > 0) {
            await users.map(user => {
                console.log('user', user);
                User.updateOne(
                    { _id: user._id },
                    { $push: {otherTasks: task._id} }
                );
            });
        }

        res.status(201).json({ message: 'Task has been created', task });

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.get('/', auth, async (req, res) => {
    try {

        const tasks = await Task.find({$or : [
            { 'creator._id': req.user.userId },
            { users: { $in: [req.user.userId]} }
            ]
        });

        res.json(tasks);

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.patch('/edit/:id', auth, async (req, res) => {
    try {

        const { title, priority, deadline, status, checked, users, text} = req.body;

        const task = await Task.findById(req.params.id);

        await Task.updateOne(
            { _id: req.params.id },
            { title, priority, deadline, status, checked, users, text }
        );

        if(task.users.length > 0) {
            await task.users.map(user => {
                if(users.indexOf(u => u._id === user._id) === -1) {
                    User.updateOne(
                        { _id: user._id },
                        { $pull: {otherTasks: req.params.id} }
                    );
                }
            });
        } else if(users.length > 0) {
            await users.map(user => {
                if(task.users.indexOf(u => u._id === user._id) === -1) {
                    User.updateOne(
                        { _id: user._id },
                        { $push: {otherTasks: req.params.id} }
                    );
                }
            });
        }

        res.status(200).json({ message: 'Task has been edited' });

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});

router.delete('/delete/:id', auth, async (req, res) => {
    try {

        const task = await Task.findById(req.params.id);

        await User.updateOne(
            { _id: task.creator._id },
            { $pull: {ownTasks: task._id} }
        );

        if(task.users.length > 0) {
            await task.users.map(user => {
                User.updateOne(
                    { _id: user._id },
                    { $pull: {otherTasks: task._id} }
                );
            });
        }

        await Task.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Task has been deleted' });

    } catch (e) {
        res.status(500).json({ message: 'Something went wrong, try again' });
    }
});


module.exports = router;