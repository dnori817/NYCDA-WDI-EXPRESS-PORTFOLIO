const express = require("express");
const app = express();

app.use(express.static("assets"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
	console.log("Serving up homepage...");
	// res.render("about");
	res.render("about", {
		 title: "About Me"
	  });
});

app.get("/gallery", function(req, res) {
	console.log("Opening gallery...");
	// res.render("gallery");
	res.render("gallery", {
		title: "Gallery",

	});
});


app.listen(3000, function() {
	console.log("Your server is available at http://localhost:3000");
});
