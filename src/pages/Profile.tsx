
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Car, ArrowLeft } from 'lucide-react';
import UserProfile from '@/components/UserProfile';

const Profile = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('currentUser') !== null;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="py-8 text-center">
        <Link to="/" className="inline-flex items-center gap-2">
          <Car className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold text-gray-900">ParkEase</h1>
        </Link>
        <p className="text-xl text-gray-600">User Profile</p>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
