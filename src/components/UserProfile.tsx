
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { User, LogOut } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
}

const UserProfile = () => {
  const [userData, setUserData] = React.useState<UserData | null>(null);

  React.useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      setUserData(JSON.parse(currentUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
    window.location.reload();
  };

  if (!userData) return null;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center mb-4">
          <User className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-xl font-bold">{userData.name}</h2>
        <p className="text-gray-600">{userData.email}</p>
      </CardHeader>
      <CardContent>
        <div className="text-center text-sm text-gray-600">
          <p>Member since {new Date().toLocaleDateString()}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserProfile;
