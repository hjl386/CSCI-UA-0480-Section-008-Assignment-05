const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const Comment = new mongoose.Schema({
	text: String, 
	user: String
});


//Comment.plugin(URLSlugs('Comment'));

const Link = new mongoose.Schema({
	url: String,
	title: String,
	comments: [Comment]
});

Link.plugin(URLSlugs('title'));

mongoose.model('Comment', Comment);
mongoose.model('Link', Link);


mongoose.connect('mongodb://localhost/hw05');
