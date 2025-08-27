const JWT_SECRET = 'your-jwt-secret-key';

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({success: false, message: 'Authorization header missing' });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({success: false, message: 'Token missing' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({success: false, message: 'Invalid or expired token' });
  }
};

module.exports = authenticateJWT;

// Protected route
// app.get('/profile', authenticateJWT, (req, res) => {
//   res.json({ message: 'Profile accessed', user: req.user });
// });

// Role-based route
// app.get('/admin', authenticateJWT, (req, res) => {
//   // Check if user has admin role
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied: admin role required' });
//   }

//   res.json({ message: 'Admin panel accessed' });
// });
