
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Car, MapPin } from 'lucide-react';
import { Booking } from '@/pages/Index';

interface BookingHistoryProps {
  bookings: Booking[];
}

const BookingHistory: React.FC<BookingHistoryProps> = ({ bookings }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'completed':
        return <Badge className="bg-blue-500">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (bookings.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <CardTitle className="text-gray-600 mb-2">No Bookings Yet</CardTitle>
          <CardDescription>
            You haven't made any parking slot bookings yet. Start by booking your first slot!
          </CardDescription>
          <Button className="mt-4">Book Your First Slot</Button>
        </CardContent>
      </Card>
    );
  }

  const sortedBookings = [...bookings].sort((a, b) => 
    new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Total Bookings: {bookings.length} | 
        Active: {bookings.filter(b => b.status === 'active').length} | 
        Completed: {bookings.filter(b => b.status === 'completed').length}
      </div>

      {sortedBookings.map((booking) => (
        <Card key={booking.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>Slot {booking.slotNumber}</span>
              </CardTitle>
              {getStatusBadge(booking.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Date:</span>
                <span>{formatDate(booking.date)}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Time:</span>
                <span>{booking.startTime} - {booking.endTime}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Car className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Booked:</span>
                <span>{formatDateTime(booking.bookedAt)}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-sm text-gray-600">
                <strong>Booking Details:</strong>
              </div>
              <div className="text-sm mt-1">
                Booking ID: <code className="bg-gray-200 px-1 py-0.5 rounded text-xs">{booking.id}</code>
              </div>
              <div className="text-sm">
                Duration: {Math.abs(
                  new Date(`2000-01-01T${booking.endTime}`).getTime() - 
                  new Date(`2000-01-01T${booking.startTime}`).getTime()
                ) / (1000 * 60 * 60)} hours
              </div>
            </div>

            {booking.status === 'active' && (
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                  Cancel Booking
                </Button>
                <Button size="sm" variant="outline" className="text-blue-600 border-blue-300 hover:bg-blue-50">
                  Extend Time
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingHistory;
