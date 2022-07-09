// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

// Intern class inherits Employee class properties and methods
class Intern extends Employee {
    constructor(name = '', id, email, school) {
        super(name, id, email);

        // properties unique to Intern class
        this.school = school;
        this.role = 'Intern';
    }

    // method unique to Intern class
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;