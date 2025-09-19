const Employee = require('./employee.model');
const httpStatus = require('../../constants/httpStatus');
 
exports.getAllEmployees = async (req, res) => {
  try {
    const data = await Employee.find().where({isDelete: false});
    const total = 0;//await PriorityModel.countDocuments().where({isDelete: false});
    console.log(data);
    res.status(200).json(httpStatus.success(data, { total }));
  } catch (error) {
    res.status(500).json(httpStatus.error(error.message, 500));
  }
};

exports.AddOrUpdateEmployee = async (req, res) => {
  const { _id=0, emailid, contactno, ...rest } = req.body;
  console.log(req.body);
  try {
    // Check for duplicate email
    const emailExists = await Employee.findOne({
      emailid,
      isDelete: false,
      ...(!!_id && { _id: { $ne: _id } }) // Exclude current doc in update
    });

    if (emailExists) {

      return res.status(500).json(httpStatus.error("Email already exists" , 500)); //res.status(400).json({ success: false, message: "Email already exists" });
    }
    console.log('dsdw');
    const contactExists = await Employee.findOne({
      contactno,
      isDelete: false,
      ...(!!_id && { _id: { $ne: _id } })
    });

    if (contactExists) {
      return res.status(400).json({ success: false, message: "Contact number already exists" });
    }

    let employee;

    if (_id) {
      employee = await Employee.findByIdAndUpdate(_id, { emailid, contactno, ...rest }, { new: true });
      if (!employee) {
        return res.status(404).json({ success: false, message: "Employee not found" });
      }
      return res.status(200).json({ success: true, data: employee, message: "Employee updated" });
    } else {
      employee = new Employee({ emailid, contactno, ...rest });
      const saved = await employee.save();
      return res.status(201).json({ success: true, data: saved, message: "Employee created" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
