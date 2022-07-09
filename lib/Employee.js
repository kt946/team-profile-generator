// TODO: Write code to define and export the Employee class
class Employee {
    // constructor for Employee class
    constructor(name = '', id, email) {
        // properties for Employee class
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = 'Employee';
    }

    // methods for Employee class
    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    }
}

module.exports = Employee;