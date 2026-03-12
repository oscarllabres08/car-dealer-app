import { useState, useMemo } from 'react';
import { Car, LogOut, Plus, Search, ChevronDown } from 'lucide-react';
import { VehicleCard } from '../components/VehicleCard';
import { VehicleFormModal } from '../components/VehicleFormModal';
import { useAuth } from '../contexts/AuthContext';
import { useVehicles } from '../hooks/useVehicles';
import { supabase, Vehicle } from '../lib/supabase';
import { FinancingCalculator } from '../components/financing/FinancingCalculator';

const CATEGORIES = ['All Categories', 'Sedan', 'Hatchback', 'SUV', 'Van', 'Pick up'];
const STATUSES = ['All Status', 'available', 'sold'];

export function AdminDashboard() {
  const { signOut } = useAuth();
  const { vehicles, loading, refetch } = useVehicles();
  const [activeView, setActiveView] = useState<'inventory' | 'financing'>('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const searchMatch =
        searchQuery === '' ||
        vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
      const categoryMatch =
        selectedCategory === 'All Categories' || vehicle.category === selectedCategory;
      const statusMatch =
        selectedStatus === 'All Status' || vehicle.status === selectedStatus;
      return searchMatch && categoryMatch && statusMatch;
    });
  }, [vehicles, searchQuery, selectedCategory, selectedStatus]);

  const handleAddVehicle = async (data: Partial<Vehicle>) => {
    const { error } = await supabase.from('vehicles').insert([data]);
    if (error) {
      console.error('Error adding vehicle:', error);
      alert('Failed to add vehicle');
    } else {
      setShowAddModal(false);
      refetch();
    }
  };

  const handleUpdateVehicle = async (data: Partial<Vehicle>) => {
    if (!editingVehicle) return;
    const { error } = await supabase
      .from('vehicles')
      .update(data)
      .eq('id', editingVehicle.id);
    if (error) {
      console.error('Error updating vehicle:', error);
      alert('Failed to update vehicle');
    } else {
      setEditingVehicle(null);
      refetch();
    }
  };

  const handleDeleteVehicle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;
    const { error } = await supabase.from('vehicles').delete().eq('id', id);
    if (error) {
      console.error('Error deleting vehicle:', error);
      alert('Failed to delete vehicle');
    }
    else {
      refetch();
    }
  };

  const handleToggleStatus = async (vehicle: Vehicle) => {
    const nextStatus = vehicle.status === 'sold' ? 'available' : 'sold';

    const { error } = await supabase
      .from('vehicles')
      .update({ status: nextStatus })
      .eq('id', vehicle.id);

    if (error) {
      console.error('Error updating vehicle status:', error);
      alert('Failed to update vehicle status');
    }
    else {
      refetch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800">
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 sticky top-0 z-50 shadow-lg animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 group">
              <Car className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white truncate bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                VELOCITY MOTORS
              </h1>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-300 text-sm sm:text-base flex-shrink-0 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-red-500/50"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Exit Admin</span>
              <span className="sm:hidden">Exit</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-6 md:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8 animate-fade-in-down">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent animate-fade-in">
              Admin Dashboard
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg animate-fade-in stagger-1">
              Manage your inventory and tools.
            </p>
          </div>
          {activeView === 'inventory' && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50 animate-fade-in stagger-2 text-sm sm:text-base"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-90" />
              <span>Add Vehicle</span>
            </button>
          )}
        </div>

        <div className="mb-4 sm:mb-6 md:mb-8 animate-fade-in stagger-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="flex w-full sm:w-auto rounded-xl bg-slate-800/80 border border-slate-700 p-1 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => setActiveView('inventory')}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeView === 'inventory'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                Inventory
              </button>
              <button
                type="button"
                onClick={() => setActiveView('financing')}
                className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  activeView === 'financing'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
              >
                Financing Calculator
              </button>
            </div>
          </div>
        </div>

        {activeView === 'inventory' && (
          <>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 sm:mb-6 md:mb-8 animate-fade-in stagger-3">
              <div className="flex-1 w-full sm:min-w-[200px] md:min-w-[250px]">
                <div className="relative group">
                  <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-focus-within:scale-110 group-focus-within:text-blue-500" />
                  <input
                    type="text"
                    placeholder="Search inventory..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-slate-800/80 backdrop-blur-sm text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-slate-800 transition-all duration-300 border border-slate-700 hover:border-slate-600 text-xs sm:text-sm md:text-base"
                  />
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-slate-800/80 backdrop-blur-sm text-gray-300 rounded-lg hover:bg-slate-700 transition-all duration-300 min-w-[120px] sm:min-w-[150px] justify-between border border-slate-700 hover:border-slate-600 transform hover:scale-105 active:scale-95 text-xs sm:text-sm"
                >
                  <span className="truncate">{selectedStatus}</span>
                  <ChevronDown
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 flex-shrink-0 ${showStatusDropdown ? 'rotate-180' : ''}`}
                  />
                </button>
                {showStatusDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl z-10 animate-fade-in-down">
                    {STATUSES.map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          setShowStatusDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-slate-700 transition-all duration-300 transform hover:translate-x-1 ${
                          selectedStatus === status
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                            : 'text-gray-300'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 bg-slate-800/80 backdrop-blur-sm text-gray-300 rounded-lg hover:bg-slate-700 transition-all duration-300 min-w-[140px] sm:min-w-[170px] justify-between border border-slate-700 hover:border-slate-600 transform hover:scale-105 active:scale-95 text-xs sm:text-sm"
                >
                  <span className="truncate">{selectedCategory}</span>
                  <ChevronDown
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 flex-shrink-0 ${showCategoryDropdown ? 'rotate-180' : ''}`}
                  />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl z-10 animate-fade-in-down">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setSelectedCategory(category);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-slate-700 transition-all duration-300 transform hover:translate-x-1 ${
                          selectedCategory === category
                            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                            : 'text-gray-300'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading vehicles...</p>
                </div>
              </div>
            ) : filteredVehicles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">
                  No vehicles found matching your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
                {filteredVehicles.map((vehicle, index) => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    onViewDetails={() => {}}
                    showActions
                    onEdit={setEditingVehicle}
                    onDelete={handleDeleteVehicle}
                    onToggleStatus={handleToggleStatus}
                    index={index}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeView === 'financing' && <FinancingCalculator />}
      </main>

      {showAddModal && (
        <VehicleFormModal
          vehicle={null}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddVehicle}
        />
      )}

      {editingVehicle && (
        <VehicleFormModal
          vehicle={editingVehicle}
          onClose={() => setEditingVehicle(null)}
          onSubmit={handleUpdateVehicle}
        />
      )}
    </div>
  );
}
