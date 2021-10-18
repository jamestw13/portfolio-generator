const inquirer = require("inquirer");

const promptUser = () => {
	return inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "What is your name?",
			validate: nameInput => {
				if (nameInput) {
					return true;
				} else {
					console.log("Please enter your name.");
					return false;
				}
			},
		},
		{
			type: "input",
			name: "github",
			message: "What is your Github username?",
			validate: githubNameInput => {
				if (githubNameInput) {
					return true;
				} else {
					console.log("Please enter your Github username.");
					return false;
				}
			},
		},
		{
			type: "confirm",
			name: "confirmAbout",
			message: 'Would you like to enter some information about yourself for an "About" section?',
			default: true,
		},
		{
			type: "input",
			name: "about",
			message: "Say something about yourself.",
			when: ({confirmAbout}) => {
				if (confirmAbout) {
					return true;
				} else {
					return false;
				}
			},
		},
	]);
};

const promptProject = portfolioData => {
	// If there's not 'projects' array property, create one
	if (!portfolioData.projects) {
		portfolioData.projects = [];
	}

	console.log(`
	=================
	Add a New Project
	=================
	`);

	return inquirer
		.prompt([
			{
				type: "input",
				name: "name",
				message: "What is the name of your project?",
				validate: projectNameInput => {
					if (projectNameInput) {
						return true;
					} else {
						console.log("Please enter your project name.");
						return false;
					}
				},
			},
			{
				type: "input",
				name: "description",
				message: "Describe the project (Required)",
				validate: descriptionInput => {
					if (descriptionInput) {
						return true;
					} else {
						console.log("Please enter a description.");
						return false;
					}
				},
			},
			{
				type: "checkbox",
				name: "languages",
				message: "What languages did you build the project using?",
				choices: ["JavaScript", "HTML", "CSS", "ES6", "jQuery", "Bootstrap", "Node"],
			},
			{
				type: "input",
				name: "link",
				message: "Enter the github link to your project (Required)",
				validate: linkInput => {
					if (linkInput) {
						return true;
					} else {
						console.log("Please enter a link.");
						return false;
					}
				},
			},
			{
				type: "confirm",
				name: "feature",
				message: "Would you like to feature this project?",
			},
			{
				type: "confirm",
				name: "confirmAddProject",
				message: "Would you like to enter another project",
				default: false,
			},
		])
		.then(projectData => {
			portfolioData.projects.push(projectData);
			if (projectData.confirmAddProject) {
				return promptProject(portfolioData);
			} else {
				return portfolioData;
			}
		});
};

promptUser()
	.then(promptProject)
	.then(projectAnswers => console.log(projectAnswers));

// const fs = require("fs");
// const generatePage = require("./src/page-template.js");

// const pageHTML = generatePage(name, github);

// fs.writeFile("index.html", pageHTML, err => {
// 	if (err) throw err;

// 	console.log("Portfolio complete! Checkout index.html to see the output!");
// });
