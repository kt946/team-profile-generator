const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./dist/");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

const managerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the team manager's name? (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter the team manager's name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the team manager's employee id? (Required)",
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log("Please enter the team manager's employee id!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the team manager's email address? (Required)",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log("Please enter the team manager's email address!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the team manager's office number? (Required)",
        validate: officeNumberInput => {
            if (officeNumberInput) {
                return true;
            } else {
                console.log("Please enter the team manager's office number!");
                return false;
            }
        }
    }
];

const engineerQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the engineer's name? (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter the engineer's name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the engineer's employee id? (Required)",
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log("Please enter the engineer's employee id!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the engineer's email address? (Required)",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log("Please enter the engineer's email address!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "What is the engineer's GitHub username? (Required)",
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log("Please enter the engineer's GitHub username!");
                return false;
            }
        }
    }
];

const internQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the intern's name? (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter the intern's name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the intern's employee id? (Required)",
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log("Please enter the intern's employee id!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the intern's email address? (Required)",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log("Please enter the intern's email address!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'school',
        message: "What is the intern's school? (Required)",
        validate: schoolInput => {
            if (schoolInput) {
                return true;
            } else {
                console.log("Please enter the intern's school!");
                return false;
            }
        }
    }
];

const promptUser = () => {
    return inquirer.prompt(managerQuestions)
    .then(answers => {
        const { name, id, email, officeNumber } = answers;
        employees.push(new Manager(name, id, email, officeNumber));
        return employees;
    });
};

const promptMenu = EmployeeData => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: "Would you like to add an engineer, an intern, or finish building your team?",
            choices: ['Engineer', 'Intern', 'Finish Building Team']
        }
    ])
    .then(menu => {
        if (menu.selection === 'Engineer') {
            return inquirer.prompt(engineerQuestions)
            .then(answers => {
                const { name, id, email, github } = answers;
                employees.push(new Engineer(name, id, email, github));
                return promptMenu(employees);
            });
        }
        else if (menu.selection === 'Intern') {
            return inquirer.prompt(internQuestions)
            .then(answers => {
                const { name, id, email, school } = answers;
                employees.push(new Intern(name, id, email, school));
                return promptMenu(employees);
            });
        }
        else {
            return EmployeeData;
        }
    });
}

const writeFile = htmlContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile(outputPath, htmlContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'HTML file created!'
            });
        });
    });
};

promptUser()
    .then(promptMenu)
    .then(EmployeeData => {
        return render(EmployeeData);
    })
    .then(renderHTML => {
        return writeFile(renderHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse.message);
    })
    .catch(err => {
        console.log(err);
    });

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
