const fs = require("fs");

const generatePage = require("./src/page-template.js");

const profileDataArgs = process.argv.slice(2, process.argv.length);

const [nname, github] = profileDataArgs;

fs.writeFile("index.html", generatePage(nname, github), err => {
	if (err) throw err;

	console.log("Portfolio complete! Checkout index.html to see the output!");
});
