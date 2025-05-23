
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ParkingGrid from '@/components/ParkingGrid';
import BookingForm from '@/components/BookingForm';
import BookingHistory from '@/components/BookingHistory';
import { Calendar, Car, Clock, Users } from 'lucide-react';

export interface ParkingSlot {
  id: string;
  number: string;
  isBooked: boolean;
  bookedBy?: string;
  bookedTime?: string;
  bookedDate?: string;
  endTime?: string;
}

export interface Booking {
  id: string;
  slotNumber: string;
  userName: string;
  userEmail: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'active' | 'completed' | 'cancelled';
  bookedAt: string;
}

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string>('John Doe');
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('john@example.com');
  const [parkingSlots, setParkingSlots] = useState<ParkingSlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Initialize parking slots (6x8 grid = 48 slots)
  useEffect(() => {
    const savedSlots = localStorage.getItem('parkingSlots');
    const savedBookings = localStorage.getItem('bookings');
    
    if (savedSlots) {
      setParkingSlots(JSON.parse(savedSlots));
    } else {
      const initialSlots: ParkingSlot[] = [];
      for (let i = 1; i <= 48; i++) {
        initialSlots.push({
          id: `slot-${i}`,
          number: `A${i.toString().padStart(2, '0')}`,
          isBooked: Math.random() > 0.7, // Randomly book some slots for demo
          bookedBy: Math.random() > 0.7 ? 'Demo User' : undefined,
          bookedTime: Math.random() > 0.7 ? '09:00' : undefined,
          bookedDate: Math.random() > 0.7 ? new Date().toISOString().split('T')[0] : undefined,
          endTime: Math.random() > 0.7 ? '17:00' : undefined,
        });
      }
      setParkingSlots(initialSlots);
      localStorage.setItem('parkingSlots', JSON.stringify(initialSlots));
    }

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  const availableSlots = parkingSlots.filter(slot => !slot.isBooked).length;
  const bookedSlots = parkingSlots.filter(slot => slot.isBooked).length;
  const totalSlots = parkingSlots.length;

  const handleSlotSelect = (slot: ParkingSlot) => {
    if (!slot.isBooked) {
      setSelectedSlot(slot);
      setActiveTab('book');
    }
  };

  const handleBookSlot = (slotId: string, date: string, startTime: string, endTime: string) => {
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      slotNumber: parkingSlots.find(s => s.id === slotId)?.number || '',
      userName: currentUser,
      userEmail: currentUserEmail,
      date,
      startTime,
      endTime,
      status: 'active',
      bookedAt: new Date().toISOString()
    };

    const updatedSlots = parkingSlots.map(slot => 
      slot.id === slotId 
        ? { 
            ...slot, 
            isBooked: true, 
            bookedBy: currentUser,
            bookedTime: startTime,
            bookedDate: date,
            endTime: endTime
          }
        : slot
    );

    const updatedBookings = [...bookings, newBooking];

    setParkingSlots(updatedSlots);
    setBookings(updatedBookings);
    setSelectedSlot(null);
    
    localStorage.setItem('parkingSlots', JSON.stringify(updatedSlots));
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    
    setActiveTab('overview');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Car className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">ParkEase</h1>
          </div>
          <p className="text-xl text-gray-600">Smart Parking Slot Booking System</p>
          <p className="text-sm text-gray-500 mt-2">Welcome back, {currentUser}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-400 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Available Slots</CardTitle>
              <Calendar className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{availableSlots}</div>
              <p className="text-xs opacity-80">Ready to book</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-400 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Booked Slots</CardTitle>
              <Car className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookedSlots}</div>
              <p className="text-xs opacity-80">Currently occupied</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-400 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Slots</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSlots}</div>
              <p className="text-xs opacity-80">Total capacity</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Bookings</CardTitle>
              <Clock className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{bookings.filter(b => b.status === 'active').length}</div>
              <p className="text-xs opacity-80">Active bookings</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Parking Overview</TabsTrigger>
            <TabsTrigger value="book">Book a Slot</TabsTrigger>
            <TabsTrigger value="history">My Bookings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Parking Lot Status</CardTitle>
                <CardDescription>
                  Click on an available slot (green) to book it. Red slots are already booked.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ParkingGrid 
                  slots={parkingSlots} 
                  onSlotSelect={handleSlotSelect}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="book" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Book a Parking Slot</CardTitle>
                <CardDescription>
                  Select a slot from the grid or choose your preferred slot below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingForm 
                  slots={parkingSlots}
                  selectedSlot={selectedSlot}
                  onBookSlot={handleBookSlot}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Booking History</CardTitle>
                <CardDescription>
                  View all your past and current parking slot bookings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BookingHistory bookings={bookings} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
