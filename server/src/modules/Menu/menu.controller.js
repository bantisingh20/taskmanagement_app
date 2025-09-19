const MenuModel = require('./menu.model');
const httpStatus = require('../../constants/httpStatus');

const defaultMenus = [
    { menuname: 'Dashboard', path: 'dashboard', icon: 'fas fa-tachometer-alt' },
    { menuname: 'Employees', path: 'employee', icon: 'fas fa-exclamation-circle' },
    { menuname: 'Priority', path: 'priority', icon: 'fas fa-exclamation-circle' },
    { menuname: 'Status', path: 'status', icon: 'fas fa-flag' },
    { menuname: 'Add Task', path: 'add-task', icon: 'fas fa-plus' },
    { menuname: 'All Tasks', path: 'all-tasks', icon: 'fas fa-tasks' },
    { menuname: 'Settings', path: '#', icon: 'fas fa-cog' }
];

exports.getAllMenu = async (req, res) => {
  try {
    const menu = await MenuModel.find().where({ isDelete: false });
    res.status(200).json(httpStatus.success(menu, null,'Get all menu', ));
  } catch (error) {
    res.status(500).json(httpStatus.error(error.message, 500));
  }
};

exports.AddMenu = async (req, res) => {
  try {
    const existing = await MenuModel.find({});
    if (existing.length === 0) {
      await MenuModel.insertMany(defaultMenus);
      res.status(500).json(httpStatus.error('Already Exists', 500));
      
    } else {
      res.status(500).json(httpStatus.error('Menus already exist. Skipping insertion', 500));
       
    }

  } catch (error) {
    res.status(500).json(httpStatus.error(error.message, 500));
  }
}