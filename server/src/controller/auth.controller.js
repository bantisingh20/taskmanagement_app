// import Employee from '../models/Users.js';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken'; 
const Employee = require('../modules/Employee/employee.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const register = async (req, res, next)=>{
    const salt =  bcrypt.genSaltSync(10);
    const hash =  bcrypt.hashSync(req.body.password, salt);

    try{
        const userData = new Employee({
            firstname: req.body.firstname,
            email: req.body.email,
            password: hash,        
        })
        const newUser = await userData.save();
        res.status(200).json(newUser);
    }catch(err){
        next(err);
    }
}

export const login = async(req, res, next) =>{
    try{
        const user = await Employee.findOne({email: req.body.email});
        if(!user){
            return next(createError(404, 'User not Found'));
        } 

        const isPassword = await bcrypt.compare(req.body.password, user.password);
        if(!isPassword) {
            return next(createError(404, 'Password is not matched!'));
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin, isDoctor: user.isDoctor}, process.env.JWT);
        const {password, ...others} = user._doc;
        res.cookie('access_token', token, {
            httpOnly: true
        })
        .status(200)
        .json({details: {...others}});
    }
    catch(err){
        next(err)
    }
}

export const viewUser = async (req, res, next) =>{
    try{
        const user = await Employee.find();
        const {password, ...others} = user;
        res.status(200).json(user);
    }
    catch(err){
        next(err)
    }
}