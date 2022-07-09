const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./dist/");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// create array to contain employee objects
const employees = [];

// array containing Employee questions
const employeeQuestions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the the employee's name? (Required)",
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter the employee's name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the employee's id? (Required)",
        validate: idInput => {
            if (idInput) {
                return true;
            } else {
                console.log("Please enter the employee's id!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the employee's email address? (Required)",
        validate: emailInput => {
            if (emailInput) {
                return true;
            } else {
                console.log("Please enter the employee's email address!");
                return false;
            }
        }
    }
];

// object containing Manager question
const managerQuestion = {
    type: 'input',
    name: 'officeNumber',
    message: "What is the employee's office number? (Required)",
    validate: officeNumberInput => {
        if (officeNumberInput) {
            return true;
        } else {
            console.log("Please enter the employee's office number!");
            return false;
        }
    }
};

// object containing Engineer question
const engineerQuestion = {
    type: 'input',
    name: 'github',
    message: "What is the employee's GitHub username? (Required)",
    validate: githubInput => {
        if (githubInput) {
            return true;
        } else {
            console.log("Please enter the employee's GitHub username!");
            return false;
        }
    }
};

// object containing Intern question
const internQuestion = {
    type: 'input',
    name: 'school',
    message: "What is the employee's school? (Required)",
    validate: schoolInput => {
        if (schoolInput) {
            return true;
        } else {
            console.log("Please enter the employee's school!");
            return false;
        }
    }
};

// initial prompt for Manager questions
const promptUser = () => {
    console.log(`
        ==================
        Add a Team Manager
        ==================
    `);

    // combine Employee and Manager questions into single array
    const questions = [...employeeQuestions, managerQuestion];
        
    // prompt user for Employee questions including Manager question
    return inquirer.prompt(questions)
    .then(answers => {
        // destructure Manager answers array
        const { name, id, email, officeNumber } = answers;
        // create new Manager object with arguments passed in and pushed to array
        employees.push(new Manager(name, id, email, officeNumber));
        // return array with Manager object
        return employees;
    })
};

// prompt for menu with list of choices
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
        // if 'Engineer' was selected, proceed to prompt with Engineer questions
        if (menu.selection === 'Engineer') {
            console.log(`
                ===============
                Add an Engineer
                ===============
            `);

            // combine Employee and Engineer questions into single array
            const questions = [...employeeQuestions, engineerQuestion];

            // prompt user for Employee questions including Engineer question
            return inquirer.prompt(questions)
            .then(answers => {
                // destructure Engineer answers array
                const { name, id, email, github } = answers;
                // create new Engineer object with arguments passed in and pushed to array
                employees.push(new Engineer(name, id, email, github));
                // return to menu with updated array
                return promptMenu(employees);
            })
        }
        // if 'Intern' was selected, proceed to prompt with Intern questions
        else if (menu.selection === 'Intern') {
            console.log(`
                =============
                Add an Intern
                =============
            `);

            // combine Employee and Intern questions into single array
            const questions = [...employeeQuestions, internQuestion];

            // prompt user for Employee questions including Intern question
            return inquirer.prompt(questions)
            .then(answers => {
                // destructure Intern answers array
                const { name, id, email, school } = answers;
                // create new Intern object with arguments passed in and pushed to array
                employees.push(new Intern(name, id, email, school));
                // return to menu with updated array
                return promptMenu(employees);
            });
        }
        // if 'Finish Building Team' was selected, return current array with objects"
        else {
            return EmployeeData;
        }
    });
}

// function to write html file to output path
const writeFile = htmlContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile(outputPath, htmlContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: "Success! HTML file created in 'dist' folder!"
            });
        });
    });
};

// initialize prompt
promptUser()
    // prompt for menu
    .then(promptMenu)
    // render employee array to html
    .then(render)
    // write HTML file with employee HTML to 'dist' folder
    .then(writeFile)
    // display success response
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
