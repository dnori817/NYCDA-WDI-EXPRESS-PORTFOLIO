const express = require("express");
const app = express();

app.use(express.static("assets"));
app.set("view engine", "ejs");

// let menu = [{
// 			 text: "Contact",
// 			 href: "#",
// 		 }, {
// 			 text: "Portfolio",
// 			 href: "#",
// 		 }, {
// 			 text: "Gallery",
// 			 href: "/gallery",
// 		 }, {
// 			 text: "About",
// 			 href: "/",
// 		 }];

// function adjustMenu() {
//
// 	if  ( menu.text. toLowerCase === page) {
//
//
// 	}
// }

app.get("/", function(req, res) {
	console.log("Serving up homepage...");
	// res.render("about");
	res.render("template", {
		page: "about",
		title: "About Me",
		menu: [{
			 text: "Contact",
			 href: "#",
		 }, {
			 text: "Portfolio",
			 href: "#",
		 }, {
			 text: "Gallery",
			 href: "/gallery",

		 }],

	  });
});


app.get("/gallery", function(req, res) {
	console.log("Opening gallery...");
	// res.render("gallery");
	res.render("template", {
		page: "gallery",
		title: "Gallery",
		menu: [{
			text: "Contact",
			href: "#",
		}, {
			text: "Portfolio",
			href: "#",
		}, {
			text: "About",
			href: "/",
		}],

	});
});


app.listen(3000, function() {
	console.log("Your server is available at http://localhost:3000");
});
