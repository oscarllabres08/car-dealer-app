import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Header } from '../components/Header';
import { VehicleFilters } from '../components/VehicleFilters';
import { VehicleCard } from '../components/VehicleCard';
import { VehicleModal } from '../components/VehicleModal';
import { LoginModal } from '../components/LoginModal';
import { useVehicles } from '../hooks/useVehicles';
import { Vehicle } from '../lib/supabase';

export function Showroom() {
  const { vehicles, loading } = useVehicles();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(new Set(vehicles.map((v) => v.make))).sort();
    return ['All', ...uniqueBrands];
  }, [vehicles]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const categoryMatch =
        selectedCategory === 'All' || vehicle.category === selectedCategory;
      const brandMatch = selectedBrand === 'All' || vehicle.make === selectedBrand;
      const searchMatch =
        searchQuery.trim() === '' ||
        vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.year.toString().includes(searchQuery);
      // Show both available and sold vehicles; status is indicated on the card
      return categoryMatch && brandMatch && searchMatch;
    });
  }, [vehicles, selectedCategory, selectedBrand, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      <Header onAdminClick={() => setShowLoginModal(true)} />

      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-6 md:py-12">
        <div className="mb-4 sm:mb-6 md:mb-8 space-y-3 sm:space-y-4 animate-fade-in-down">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2 md:mb-3 gradient-text animate-fade-in">
              Our Inventory
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg animate-fade-in stagger-1">
              Browse our extensive collection of quality vehicles.
            </p>
          </div>

          <div className="max-w-xl animate-fade-in stagger-2">
            <div className="relative group">
              <Search className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-focus-within:scale-110 group-focus-within:text-blue-500" />
              <input
                type="text"
                placeholder="Search by brand, model, or year..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-800 placeholder:text-gray-500 text-xs sm:text-sm md:text-base transition-all duration-300 border border-slate-700 hover:border-slate-600"
              />
            </div>
          </div>
        </div>

        <VehicleFilters
          selectedCategory={selectedCategory}
          selectedBrand={selectedBrand}
          brands={brands}
          onCategoryChange={setSelectedCategory}
          onBrandChange={setSelectedBrand}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading vehicles...</p>
            </div>
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No vehicles found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onViewDetails={setSelectedVehicle}
                index={index}
              />
            ))}
          </div>
        )}
      </main>

      {selectedVehicle && (
        <VehicleModal vehicle={selectedVehicle} onClose={() => setSelectedVehicle(null)} />
      )}

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </div>
  );
}
