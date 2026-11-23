
const express = require('express');
const cors = require('cors');

const app = express();

const HomeRoutes = require('./routes/HomeRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const User = require("./models/User");

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api', HomeRoutes);
app.use("/auth", AuthRoutes);

// API kiểm tra
app.get('/', (req, res) => {
    res.json({
        message: 'Website Hoc Lap Trinh API is running!'
    });
});

module.exports = app;
