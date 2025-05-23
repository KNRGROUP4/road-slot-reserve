
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Car } from 'lucide-react';
import { ParkingSlot } from '@/pages/Index';

interface BookingFormProps {
  slots: ParkingSlot[];
  selectedSlot: ParkingSlot | null;
  onBookSlot: (slotId: string, date: string, startTime: string, endTime: string) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ slots, selectedSlot, onBookSlot }) => {
  const [selectedSlotId, setSelectedSlotId] = useState<string>(selectedSlot?.id || '');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');

  const availableSlots = slots.filter(slot => !slot.isBooked);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSlotId && date && startTime && endTime) {
      onBookSlot(selectedSlotId, date, startTime, endTime);
      // Reset form
      setSelectedSlotId('');
      setDate(new Date().toISOString().split('T')[0]);
      setStartTime('09:00');
      setEndTime('17:00');
    }
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 6; hour < 24; hour++) {
      const timeString = `${hour.toString().padStart(2, '0')}:00`;
      times.push(timeString);
    }
    return times;
  };

  return (
    <div className="space-y-6">
      {selectedSlot && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Car className="h-5 w-5 text-blue-600" />
              <span>Selected Slot: {selectedSlot.number}</span>
            </CardTitle>
            <CardDescription>
              You've selected slot {selectedSlot.number}. Fill in the details below to complete your booking.
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slot Selection */}
          <div className="space-y-2">
            <Label htmlFor="slot">Select Parking Slot</Label>
            <Select value={selectedSlotId} onValueChange={setSelectedSlotId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a parking slot" />
              </SelectTrigger>
              <SelectContent>
                {availableSlots.map((slot) => (
                  <SelectItem key={slot.id} value={slot.id}>
                    Slot {slot.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Booking Date</span>
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <Label htmlFor="startTime" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Start Time</span>
            </Label>
            <Select value={startTime} onValueChange={setStartTime}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {generateTimeOptions().map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <Label htmlFor="endTime" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>End Time</span>
            </Label>
            <Select value={endTime} onValueChange={setEndTime}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {generateTimeOptions().map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Booking Summary */}
        {selectedSlotId && (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Slot:</span>
                <span>{slots.find(s => s.id === selectedSlotId)?.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date(date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{startTime} - {endTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Duration:</span>
                <span>
                  {Math.abs(
                    new Date(`2000-01-01T${endTime}`).getTime() - 
                    new Date(`2000-01-01T${startTime}`).getTime()
                  ) / (1000 * 60 * 60)} hours
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!selectedSlotId || !date || !startTime || !endTime}
        >
          Book Parking Slot
        </Button>
      </form>
    </div>
  );
};

export default BookingForm;
