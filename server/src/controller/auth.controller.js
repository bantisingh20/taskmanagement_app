
const Employee = require('../modules/Employee/employee.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const httpStatus = require('../constants/httpStatus');

exports.register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    try {
        const userData = new Employee({
            firstname: req.body.firstname,
            email: req.body.email,
            password: hash,
        })
        const newUser = await userData.save();
        res.status(200).json(httpStatus.success(newUser, null, "User Created Successfully"));
    } catch (err) {
        next(err);
    }
}

exports.login = async (req, res, next) => {
  try {
    const user = await Employee.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json(httpStatus.error("User not Found", 404));
    }

    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      return res.status(404).json(httpStatus.error("Password is not matched!", 404));
    }
 
    const expiresIn = 60 * 60;  
    const token = jwt.sign(
      { id: user._id, firstname: user.firstname },
      process.env.JWT,
      { expiresIn }  
    );

    const { password, ...others } = user._doc;

 
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: expiresIn * 1000,  
    });
 
    const expiresAt = Date.now() + expiresIn * 1000;

    res.status(200).json({
      success: true,
      data: {
        ...others,
        tokenExpiresAt: expiresAt, 
      },
      token
    });
  } catch (err) {
    next(err);
  }
};

