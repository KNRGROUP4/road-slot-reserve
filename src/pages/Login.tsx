
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/LoginForm';
import { Car } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="py-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <Car className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">ParkEase</h1>
        </Link>
        <p className="text-xl text-gray-600">Smart Parking Slot Booking System</p>
      </div>
      
      <div className="flex-1 flex items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
