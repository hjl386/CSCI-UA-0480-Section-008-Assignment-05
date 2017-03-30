const mongoose = require('mongoose');

//Commentplugin(URLSlugs('Comment'));

const Comment = new mongoose.Schema({
	text: String, 
	user: String
});

mongoose.model("Comment", Comment);

//Linkplugin(URLSlugs('Link'));

const Link = new mongoose.Schema({
	url: String,
	title: String,
	comments: [Comment]
});

mongoose.model("Link", Link);

mongoose.connect('mongodb://localhost/hw05');
