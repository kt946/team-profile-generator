// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

// Engineer class inherits Employee class properties and methods
class Engineer extends Employee {
    constructor(name = '', id, email, github) {
        super(name, id, email);

        // properties unique to Engineer class
        this.github = github;
        this.role = 'Engineer';
    }

    // method unique to Engineer class
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;