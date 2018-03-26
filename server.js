const express = require("express");
const bodyParser = require("body-parser");
const bcrypt =require ("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'lacienega',
		database: 'smart-brain'
	}
});


const app = express();
app.use(bodyParser.json());
app.use(cors());


// routes
app.get("/", (req, res) => { res.send(database.users) });
// - signin route
app.post("/signin", (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
// - register route
app.post("/register", (req, res) => { register.handleRegister(req, res, db, bcrypt) });
// - get user profile by id in url params
app.get("/profile/:id", (req, res) => { profile.handleProfileGet(req, res, db) });
// - update the entries count 
app.put("/image", (req, res) => { image.handleImange(req, res, db) });
// - hiding the api key in the backend
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) });


app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
});

