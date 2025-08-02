import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext.jsx';

import { Login } from '../pages/Login';
import Register from '../pages/register';
import ForgetPassword from '../pages/forgetpassword';
import {AddTask} from '../pages/addtask';
import Dashboards from '../pages/dashboard';
import TaskList from '../pages/TaskList';
import Layout from '../layout/layout.jsx';
import PrivateRoute from '../components/PrivateRoute';
import { Priority } from '../pages/priority.jsx';
import { StatusPage } from '../pages/status.jsx';

export const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />

         <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

         <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="dashboard" element={<Dashboards />} />
          <Route path="all-tasks" element={<TaskList />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="view-task/:id" element={<div>View Task</div>} />
          <Route path="edit-task/:id" element={<div>Edit Task</div>} />
          <Route path="add-task/:id" element={<div>Add Task by ID</div>} />
          <Route path="priority" element={<Priority />} />
          <Route path="status" element={<StatusPage />} />
        </Route>

        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
};
