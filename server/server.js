var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var jwt = require('jsonwebtoken');


// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log requests to console
app.use(morgan('dev'));
//We will add a quick home page route so I can give a quick demonstration of what morgan does.Add this next.

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function(req, res) {
    res.send('Relax. We will put the home page here later.');
});