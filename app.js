const express = require("express");
const app = express();
const countries = require("./json/country-info.json");

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
//
// function adjustMenu() {
//
// 	if  (menu.text. toLowerCase === page) {
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

app.get("/countries/:countryId", function(req, res) {
	let country = countries[req.params.countryId];
	if (!country) {
		res.status(404);
		res.render("404");
	}
	res.render("country",  {
		country,
	});
});

app.get("*", function(req, res) {
	// res.send("This is not a valid page, go away!");
	// res.render("404");
	res.render("template", {
		page: "404",
		title: "",
		menu: [],
	});
});


app.listen(3000, function() {
	console.log("Your server is available at http://localhost:3000");
});
