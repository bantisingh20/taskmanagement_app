import React, { useState } from 'react'; 
export const Login = () => {
   
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'visitor',
  });

  const handleChange = () => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async  () => {
    e.preventDefault();
    try {
      const res = await login({ formData }).unwrap();
      dispatch(setCredentials(res));
      // redirect or notify
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-center text-xl font-semibold text-gray-700 mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition-colors text-sm"
          >
            Sign In
          </button>

          <div className="text-center text-gray-500 text-xs mt-4">
            <p>Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a></p>
            <p>Forgot your password? <a href="/reset-password" className="text-blue-600 hover:underline">Reset it</a></p>
          </div>
        </form>
      </div>
    </div>
  );
};
