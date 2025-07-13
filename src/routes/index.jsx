import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../pages/Login';
import Register from '../pages/register';
import ForgetPassword from '../pages/forgetpassword';
import AddTask from '../pages/addtask';
import Dashboards from '../pages/dashboard';
import TaskList from '../pages/TaskList';

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} /> 
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ForgetPassword />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path='*' element={<div>404 Not Found</div>} />
      <Route path="/home" element={ <TaskList /> } />
      <Route path="/dashboard" element={<Dashboards />} /> 
      <Route path="add-task" element={<AddTask />} /> 
      <Route path="view-task/:id" element={<div>View Task by ID Page</div>} />
      <Route path="edit-task/:id" element={<div>Edit Task by ID Page</  div>} />
      <Route path="add-task/:id" element={<div>Add Task by ID Page</div>} />
      <Route path="*" element={<div>404 Not Found</div>} />
      
      {/* Add more routes as needed */}
    </Routes>
  </BrowserRouter>
);
