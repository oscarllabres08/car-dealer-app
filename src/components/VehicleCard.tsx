import { Gauge, Fuel, Settings } from 'lucide-react';
import { Vehicle } from '../lib/supabase';

interface VehicleCardProps {
  vehicle: Vehicle;
  onViewDetails: (vehicle: Vehicle) => void;
  showActions?: boolean;
  onEdit?: (vehicle: Vehicle) => void;
  onDelete?: (id: string) => void;
  onToggleStatus?: (vehicle: Vehicle) => void;
  index?: number;
}

export function VehicleCard({
  vehicle,
  onViewDetails,
  showActions = false,
  onEdit,
  onDelete,
  onToggleStatus,
  index = 0
}: VehicleCardProps) {
  const isSold = vehicle.status === 'sold';
  const staggerDelay = `stagger-${Math.min(index % 6, 5)}`;

  return (
    <div 
      className={`bg-slate-800 rounded-xl overflow-hidden transition-smooth hover-lift animate-fade-in-up ${staggerDelay} group cursor-pointer`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative overflow-hidden">
        <div className="relative w-full h-32 sm:h-48 md:h-56 overflow-hidden">
          <img
            src={vehicle.image_url}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 flex gap-1 sm:gap-2 z-10">
          <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 bg-slate-900/80 backdrop-blur-sm text-white text-xs sm:text-sm font-medium rounded-full border border-white/10 transition-transform duration-300 group-hover:scale-110">
            {vehicle.category}
          </span>
          {isSold && (
            <span className="px-1.5 py-0.5 sm:px-3 sm:py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs sm:text-sm font-bold rounded-full border border-red-400/30 animate-pulse-glow">
              SOLD
            </span>
          )}
        </div>

        {isSold && !showActions && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <span className="px-3 sm:px-6 py-1.5 sm:py-3 border-2 border-red-500 text-red-500 text-lg sm:text-2xl font-extrabold tracking-[0.2em] sm:tracking-[0.3em] uppercase bg-black/90 rounded-lg transform scale-100 animate-pulse">
              SOLD
            </span>
          </div>
        )}
      </div>

      <div className="p-2 sm:p-4 md:p-5">
        <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
          <div className="flex-1 min-w-0 pr-1 sm:pr-2">
            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-white truncate leading-tight">
              {vehicle.make} {vehicle.model}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base">{vehicle.year}</p>
          </div>
          <p className="text-base sm:text-xl md:text-2xl font-bold text-blue-500 flex-shrink-0 ml-1">
            ₱{vehicle.price.toLocaleString()}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
          <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2 text-gray-300">
            <Gauge className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm truncate">{vehicle.mileage}</span>
          </div>
          <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2 text-gray-300">
            <Settings className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm truncate">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center space-x-0.5 sm:space-x-1 md:space-x-2 text-gray-300">
            <Fuel className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span className="text-[10px] sm:text-xs md:text-sm truncate">{vehicle.fuel_type}</span>
          </div>
        </div>

        {!showActions ? (
          <button
            onClick={() => onViewDetails(vehicle)}
            className="w-full py-1.5 sm:py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50 text-xs sm:text-sm md:text-base"
          >
            View Details
          </button>
        ) : (
          <div className="space-y-1.5 sm:space-y-2">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <button
                onClick={() => onEdit?.(vehicle)}
                className="py-1.5 sm:py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-1 sm:space-x-2 shadow-md hover:shadow-lg text-xs sm:text-sm"
              >
                <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => onDelete?.(vehicle.id)}
                className="py-1.5 sm:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-red-500/50 text-xs sm:text-sm"
              >
                Delete
              </button>
            </div>
            <button
              onClick={() => onToggleStatus?.(vehicle)}
              className={`w-full py-1.5 sm:py-2 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg text-xs sm:text-sm ${
                isSold
                  ? 'bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white'
                  : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
              }`}
            >
              {isSold ? 'Mark Available' : 'Mark Sold'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
