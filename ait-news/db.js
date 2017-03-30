const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');

const Comment = new mongoose.Schema({
	text: String, 
	user: String
});

mongoose.model('Comment', Comment);
//Comment.plugin(URLSlugs('Comment'));

const Link = new mongoose.Schema({
	url: String,
	title: String,
	comments: [Comment]
});

mongoose.model('Link', Link);
Link.plugin(URLSlugs('Link'));

mongoose.connect('mongodb://localhost/hw05');
