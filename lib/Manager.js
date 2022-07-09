// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

// Manager class inherits Employee class properties and methods
class Manager extends Employee {
    constructor(name = '', id, email, officeNumber) {
        super(name, id, email);

        // properties unique to Manager class
        this.officeNumber = officeNumber;
        this.role = 'Manager';
    }

    // method unique to Manager class
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;