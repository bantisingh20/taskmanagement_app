// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authcontext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
