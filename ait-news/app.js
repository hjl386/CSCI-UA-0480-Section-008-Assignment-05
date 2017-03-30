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

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));

require('./db');
const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Link = mongoose.model('Link');

app.use(bodyParser.urlencoded({extended:false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/css/base.css', (req, res) => {
	res.render('base.css');
});

app.get('/', (req, res) => {
	Link.find({}, (err, links) => {
		if(err){
			console.log(err);
		}
		res.render('link', {links: links});	
	});
});

app.post('/', (req, res) => {
	const w = 'https://';
	const c = '.com';
	if (req.body.url.substring(0, 5).toLowerCase() !== 'https'){
		req.body.url = w + req.body.url;
	}
	if (req.body.url.slice(-3) !== 'com'){
		req.body.url += c;
	} 
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

app.get('/:slug', (req, res) => {
	Link.find({slug: req.params.slug}, (err, links) => {
		if(err){
			console.log(err);
		}
		res.render('comment', {links: links});
	});
});

app.post('/:slug', (req, res) => {
/*	const c = new Comment({
		text: req.body.comment,
		user: req.body.name
	});
*/
	Link.findOneAndUpdate({slug: req.params.slug}, {$push: {comments: {text: req.body.comment, user: req.body.name}}}, (err, links) => {
		res.redirect(req.params.slug);		
	});
/*	c.save((err) => {
		if(err){
			console.log(err);
		}
		res.redirect(req.params.slug);
	});
*/
});
/*
app.get('/:slug', (req, res) => {
	Comment.find({}, (err, comments) => {
		if(err){
			console.log(err);
		}
		res.render('comment', {comments: comments});
	});
});

app.post('/:slug', (req, res) => {
	const c = new Comment({
		text: req.body.comment,
		user: req.body.name
	});
	c.save((err) => {
		if(err){
			console.log(err);
		}
		res.redirect(req.params.slug);
	});
});
*/
app.listen(PORT, HOST);
