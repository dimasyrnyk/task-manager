const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/task', require('./routes/task.routes'));
app.use('/api/user', require('./routes/user.routes'));

const PORT = config.get('port') || 5000;


async function start() {
    try {
        mongoose.connect(config.get("mongoUrl"),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => console.log(`Server hes been started on port ${PORT}...`));
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}

start();