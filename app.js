const express = require("express");
const app = express();
const countries = require("./json/country-info.json");

app.use(express.static("assets"));
app.set("view engine", "ejs");

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
		 }],
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


// ************************
// Country-info assignment
// ************************

app.get("/countries/:countryId", function(req, res) {
	let country = countries[req.params.countryId.toUpperCase()];
	if (!country) {
		res.status(404);
		res.render("404");
	}
	res.render("country",  {
		country,
	});
});


app.get("*", function(req, res) {
	renderTemplate(res, "404", "PAGE NOT FOUND!!!");
});


app.listen(3000, function() {
	console.log("Your server is available at http://localhost:3000");
});
