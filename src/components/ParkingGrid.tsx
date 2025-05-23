
import React from 'react';
import { Button } from '@/components/ui/button';
import { Car } from 'lucide-react';
import { ParkingSlot } from '@/pages/Index';

interface ParkingGridProps {
  slots: ParkingSlot[];
  onSlotSelect: (slot: ParkingSlot) => void;
}

const ParkingGrid: React.FC<ParkingGridProps> = ({ slots, onSlotSelect }) => {
  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Selected</span>
        </div>
      </div>

      {/* Parking Grid */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="text-center mb-4 text-gray-600 font-semibold">
          🚧 ENTRANCE 🚧
        </div>
        
        <div className="grid grid-cols-6 gap-3 max-w-4xl mx-auto">
          {slots.map((slot, index) => (
            <div key={slot.id} className="relative">
              <Button
                variant="outline"
                className={`
                  w-full h-16 p-2 border-2 transition-all duration-200 hover:scale-105
                  ${slot.isBooked 
                    ? 'bg-red-500 border-red-600 text-white cursor-not-allowed' 
                    : 'bg-green-500 border-green-600 text-white hover:bg-green-600'
                  }
                `}
                onClick={() => onSlotSelect(slot)}
                disabled={slot.isBooked}
              >
                <div className="flex flex-col items-center justify-center space-y-1">
                  <Car className="h-4 w-4" />
                  <span className="text-xs font-bold">{slot.number}</span>
                </div>
              </Button>
              
              {slot.isBooked && (
                <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 py-0.5 rounded">
                  Occupied
                </div>
              )}
              
              {/* Add lane markers every 6 slots */}
              {(index + 1) % 6 === 0 && index < slots.length - 1 && (
                <div className="w-full h-2 bg-yellow-400 mt-2 rounded flex items-center justify-center">
                  <div className="text-xs text-gray-700 font-semibold">LANE</div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4 text-gray-600 font-semibold">
          🚧 EXIT 🚧
        </div>
      </div>

      {/* Additional Info */}
      <div className="text-center text-sm text-gray-600">
        <p>Total Slots: {slots.length} | Available: {slots.filter(s => !s.isBooked).length} | Booked: {slots.filter(s => s.isBooked).length}</p>
      </div>
    </div>
  );
};

export default ParkingGrid;
