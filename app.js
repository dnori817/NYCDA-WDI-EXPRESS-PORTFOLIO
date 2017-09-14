require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const sql = require("./util/sql.js");
const multer = require("multer");
const fs = require('fs');
const countries = require("./json/country-info.json");
const Blog = require("./util/blog.js");
const Posts = require("./models/posts.js");
const app = express();


app.use(express.static("assets"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


function renderTemplate(res, page, title) {
	return res.render("template", {
		page: page,
		title: title,
		menu: [{
			 text: "Contact",
			 href: "#",
		 }, {
			 text: "Portfolio",
			 href: "#",
		 }, {
			 text: "Gallery",
			 href: "/gallery",
		 }, {
			 text: "About",
			 href: "/",
		 }, {
			 text: "Blog",
			 href: "/blog",
		 }],
	});
}

function renderBlog(res, title, date, body) {
	Posts.findAll().then(function(posts) {
		res.render("blog", {
			title: title,
			date: date,
			body: body,
		});
	});
}

app.get("/", function(req, res) {
	console.log("Serving up homepage...");
	renderTemplate(res, "about", "About Me");
});


app.get("/gallery", function(req, res) {
	console.log("Opening gallery...");
	renderTemplate(res, "gallery", "Gallery");
});

app.get("/blog", function(req, res, posts) {
	Posts.findAll().then(function(posts) {
		renderTemplate(res, "blog", "Blog", { posts: posts });
	});
});
app.get("/form", function(req, res) {
	renderTemplate(res, "form", "Form");
});

app.post("/blog", function(req, res) {
	Blog.create({
		title: req.body.title,
		date: req.body.date,
		body: req.body.body,
	})
	.then(function() {
		renderBlog(res);
	});
});

app.get("/blog", function(req, res) {
	renderBlog(res);
});





// ************************
// Country-info assignment
// ************************

// app.get("/countries/:countryId", function(req, res) {
// 	let country = countries[req.params.countryId.toUpperCase()];
// 	if (!country) {
// 		res.status(404);
// 		return res.render("404");
// 	}
// 	res.render("country",  { country });
// });
//
//
// app.get("*", function(req, res) {
// 	renderTemplate(res, "404", "PAGE NOT FOUND!!!");
// });

sql.sync().then(function() {
	console.log("Database synced");
	const port = process.env.PORT || 3000;


	app.listen(3000, function() {
		console.log("Your server is available at http://localhost:3000");
	});
});
