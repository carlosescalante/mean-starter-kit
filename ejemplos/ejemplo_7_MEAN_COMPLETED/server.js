// modules =================================================
var express = require('express');
var app     = express();
var mongoose= require('mongoose');

// configuration ===========================================
	
// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)
//mongoose.connect(db.url);

var personSchema = {
    id: Number,
    age: Number,
    name: String,
    company: String,
    email: String,
    phone: String,
    address: String,
    about:  String,
    registered: String,
    tags: [
        String, String, String, String, String, String, String
    ],
    friends: [
        {
            "id": Number,
            "name": String
        },
        {
            "id": Number,
            "name": String
        },
        {
            "id": Number,
            "name": String
        }
    ],
    "greeting": String,
    "favoriteFruit": String
}

var todoSchema = {
    description : String,
    status : Boolean
}

var conn1 = mongoose.createConnection(db.url),
    conn2 = mongoose.createConnection(db.url2),
    conn3 = mongoose.createConnection(db.url3);

var Person = conn1.model("Person", personSchema, "people");
exports.PersonModel = Person;

var Todo = conn2.model("Todo", todoSchema, "todos");
exports.TodoModel = Todo;

var personSchema2 = {
    id: Number,
    age: Number,
    name: String,
    gender: String,
    company: String,
    email: String,
    address: String,
    roles: [String]
}

var PersonModel = conn3.model("Person", personSchema2, "people");
exports.Person = PersonModel;

app.configure(function() {
	app.use(express.static(__dirname + '/public')); 	// set the static files location /public/img will be /img for users
	app.use(express.logger('dev')); 					// log every request to the console
	app.use(express.bodyParser()); 						// pull information from html in POST
	app.use(express.methodOverride()); 					// simulate DELETE and PUT
});

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app