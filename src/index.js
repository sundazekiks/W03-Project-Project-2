const express = require('express');
const { config } = require('dotenv');
const cors = require('cors');
const { run } = require('./db/mongodb');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger_output.json');
const personRoute = require('./routes/person.route');
const familyRoute = require('./routes/family.route');
const authRoute = require('./routes/auth.route');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('./middleware/passport');

config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());



// View engine setup — set once, no duplicates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main');   // relative to views/ folder
app.use(expressLayout);

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/auth', authRoute);
app.use('/person', personRoute);
app.use('/family', familyRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/main', (req, res) => {
    res.render('main', { title: 'Home Page' });
});

// error handlers



app.get('/', (req, res) => {
    res.send('Hello World!');
});


async function startServer() {
    try {
        console.log('Connecting to MongoDB...');
        await run();
        console.log('Connected to MongoDB!');

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });

    } catch (err) {
        console.error(err);
    }
}

startServer();
