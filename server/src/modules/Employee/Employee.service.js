const Employee = require('./employee.model');

export const IsEmailExists = async (emailid) => {
    const data = new Employee.findOne({ emailid });
    return data;
};

export const login = async (data) => {
    const data = new Employee.findOne({ emailid });
    return data;
};