const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
const UserRoutes = require('./routes/routes');
const { DeleteUnVerifiedUser } = require('./controller/UserController');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

connectDb()
// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1',UserRoutes)

//cron job which run every 24 hours

DeleteUnVerifiedUser()


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
