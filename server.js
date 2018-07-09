const express = require('express');
const cors = require('cors');
const app = express();
const request = require('request');
const port = 8000;
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const router = express.Router();
const mysql = require('mysql');
const logger = require('morgan')
require('dotenv').load();

const API_KEY = process.env.REACT_APP_ETSY_API_KEY;

const API_URL = process.env.API_URL;


// Create mySql connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'Giftr'
});

connection.connect(err => {
    if (err) {
        return err;
    }
    // console.log(connection);
});

// Middleware
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(logger("dev")); 
app.use(bodyParser.urlencoded({ extended: false }));



// app.get('/', (req, res) => {
//     // eventually send entire public folder
//     res.send(JSON.stringify(req.user));
// });


//connection from Auth0 profile info to import to  db
app.post('/profile', function (req, res) {
    console.log( "i'm here!" ,req.body.email);
    const formInfo = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date: req.body.date
    };
    connection.query('INSERT INTO Users SET ?', formInfo, (err, results, fields) => {
        if (err){
            console.log(err);
            res.send('Registration failed: ' + err.message)
        } else {
            res.send('Registration complete')
        }
    })
});

app.post('/added', (req, res) => {

    const productInfo = { 
        listing_id: req.body.listing_id, 
        title: req.body.title, 
        user_email: req.body.user_email
    };
    console.log("hello lian", productInfo);


    connection.query('INSERT INTO Products SET ?', productInfo, (err, results, fields) => {
        if (err) throw err;
        res.send({added: 1});
    })
})

app.get('/products/:email', function (req, res) {
    const email = req.params.email;
    const PRODUCT_TITLES_QUERY = 'SELECT TITLE FROM Products WHERE user_email = ? ORDER BY id DESC';

    console.log("hello from server")
    connection.query(PRODUCT_TITLES_QUERY, email, (err, results) => {
        if (err) {
            console.log(err);
            return res.send(err)
        } else {
            // displays db query in terminal
            // console.log(results);
            // Display db query in GUI
            return res.json({
                data: results
            })
        }
    })
});


app.post('/etsy', function (req, res) {
    let keywords = req.body.keywords;
    let limit = req.body.amount;
    console.log(req.body);
    request(`http://openapi.etsy.com/v2/listings/active?method=GET&api_key=${API_KEY}&keywords=${keywords}&limit=${limit}`, function (error, response, body) {
        var parsedData = JSON.parse(body);

        if (!error && response.statusCode == 200) {

            return res.send(parsedData['results']);
         }
    });
})

// error handler for MySQL
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;