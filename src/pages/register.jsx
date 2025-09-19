import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSnackbar } from '../components/SnackbarProvider';
import AuthService from '../service/auth';

const Register = () => {

  const { showSnackbar } = useSnackbar();
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const onSubmit = async (formData) => {
    try {
      let response = await AuthService.Register(formData);;
      if (response?.success) {
        showSnackbar(response.message, 'success')
        return //setlist([...list, response.data]);
      }
      showSnackbar(response.message, 'error')
    } catch (error) {
      console.log(error?.response?.data?.message);
      showSnackbar(error?.response?.data?.message, 'error')
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-sky-100">
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-2">Sign Up</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Create your account to manage your tasks</p>
        <form className="space-y-4" id="registerform" onSubmit={handleSubmit(onSubmit)} >
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              type="text"
              {...register("firstname", { required: "Name is required" })}
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="you@example.com"  
              {...register("emailid", { required: "Email is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"  
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 transition"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-sky-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
