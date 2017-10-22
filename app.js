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


function renderTemplate(res, page, title, pageArgs) {
	return res.render("template", {
		page: page,
		pageArgs: pageArgs || {},
		title: title,
		menu: [{
			text: "Resume",
			href: "/David-Noriega-Resume-2017.pdf",
			target: "_blank",
		 }, {
			 text: "Portfolio",
			 href: "/portfolio",
		 }, {
			 text: "About",
			 href: "/",
		//  }, {
		// 	 text: "Blog",
		// 	 href: "/blog",
		 }],
	});
}


app.get("/", function(req, res) {
	console.log("Serving up homepage...");
	renderTemplate(res, "about", "Full Stack Web Developer");
});


app.get("/contact", function(req, res) {
	console.log("Opening contact page...");
	renderTemplate(res, "contact", "Contact Dave");
});

app.get("/portfolio", function(req, res) {
	console.log("Opening portfolio page...");
	renderTemplate(res, "portfolio", "Portfolio");
});

app.get("/blog", function(req, res, posts) {
	Posts.findAll().then(function(posts) {
		renderTemplate(res, "blog", "Blog", { posts: posts });
	});
});

app.get("/form", function(req, res) {
	renderTemplate(res, "form", "New Post");
});

app.post("/form", function(req, res) {
	Posts.create({
		title: req.body.title,
		date: req.body.date,
		body: req.body.body,
	})
	.then(function() {
		res.redirect("/blog");
	});
});


app.get("*", function(req, res) {
	renderTemplate(res, "404", "PAGE NOT FOUND!!!");
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



sql.sync().then(function() {
	console.log("Database synced");
	const port = process.env.PORT || 3000;


	app.listen(port, function() {
		console.log("Your server is available at http://localhost:3000");
	});
});
