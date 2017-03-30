// app.js

// Use __dirname to construct absolute paths for:

// 1. express-static
// 2. hbs views

// (the instructions have details on how to do this)

// LISTEN ON PORT 3000

const express = require('express');
const app = express();
const [PORT, HOST] = [3000, '127.0.0.1'];
const bodyParser = require('body-parser');

require('./db');
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Link = mongoose.model('Link');

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/css/base.css', (req, res) => {
	res.render('base.css');
});

app.get('/', (req, res) => {
	Link.find({}, (err, links) => {
		if(err){
			console.log(err);
		}
		res.render('link', (links: links));	
	});
});

app.post('/', (req, res) => {
	const l = new Link({
		url: req.body.url,
		title: req.body.title,
		comments: req.body.comments
	});
	l.save((err) => {
		if(err){
			console.log(err);
		}
		res.redirect('/');
	});
});

app.listen(PORT, HOST);
