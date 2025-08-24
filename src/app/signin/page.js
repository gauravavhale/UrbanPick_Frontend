"use client"
import axios from "axios";
import React, { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Regex patterns
  const regex = {
    fullName: /^[a-zA-Z\s]{3,30}$/, // Only letters & spaces, min 3 chars
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email pattern
    password: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,20}$/,
    // Min 6 chars, 1 uppercase, 1 number
  };

  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        if (!regex.fullName.test(value)) {
          return "Full name must be 3-30 letters only.";
        }
        break;
      case "email":
        if (!regex.email.test(value)) {
          return "Enter a valid email address.";
        }
        break;
      case "password":
        if (!regex.password.test(value)) {
          return "Password must be 6-20 chars, include uppercase & number.";
        }
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // validate as user types
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // validate all fields before submit
    let newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } 
    
    try {
      const response = await axios.post(`${apiUrl}/auth/signin`,formData)
      const {success , user} = response.data
      if(success && user._id && user.fullName){
        alert('Signin Successfull', response.data)
      } else {
        alert('Something Went Wrong')
      }
      console.log(response.data)
    } catch(err){
      alert(err.response.data.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-center text-green-600 mb-6">
          UrbanPick
        </h1>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Create Account</h2>
        <p className="text-sm text-gray-500 mb-6">
          Join UrbanPick and start shopping today!
        </p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.fullName ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-green-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={Object.values(errors).some((err) => err)} // disable if any error exists
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 rounded-lg font-semibold transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-sm text-gray-500">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          type="button"
          className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Sign up with Google
        </button>

        {/* Login link */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
