import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

export const Login = () => {
   
  const { register,handleSubmit,reset } = useForm();
  
  const onSubmit = async  (formData) => {
 
    try {
      const res = await login({formData  }).unwrap();
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
        <form onSubmit={handleSubmit(onSubmit)} id='loginform' className="space-y-4 text-sm">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email" 
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              
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
            <p>Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register</Link></p>
            <p>Forgot your password? <Link to="/reset-password" className="text-blue-600 hover:underline">Reset it</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};
