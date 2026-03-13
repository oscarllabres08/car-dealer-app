import { ChevronDown, X } from 'lucide-react';
import { useState } from 'react';

const CATEGORIES = ['All', 'Sedan', 'Hatchback', 'SUV', 'Van', 'Pick up'];

interface VehicleFiltersProps {
  selectedCategory: string;
  selectedBrand: string;
  brands: string[];
  onCategoryChange: (category: string) => void;
  onBrandChange: (brand: string) => void;
}

export function VehicleFilters({
  selectedCategory,
  selectedBrand,
  brands,
  onCategoryChange,
  onBrandChange
}: VehicleFiltersProps) {
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

  return (
    <div className="mb-4 sm:mb-6 md:mb-8 space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-6">
        <span className="text-gray-300 font-medium text-xs sm:text-sm md:text-base">Type:</span>
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`flex-none inline-flex items-center justify-center h-8 sm:h-9 md:h-10 w-20 sm:w-24 md:w-28 rounded-md font-medium transition-colors duration-200 whitespace-nowrap text-xs sm:text-sm md:text-base truncate ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 md:gap-6">
        <span className="text-gray-300 font-medium text-xs sm:text-sm md:text-base">Brand:</span>
        <div className="relative">
          <button
            onClick={() => setShowBrandDropdown(!showBrandDropdown)}
            className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all duration-300 transform hover:scale-105 active:scale-95 min-w-[120px] sm:min-w-[140px] justify-between w-full sm:w-auto border border-slate-600 hover:border-slate-500 text-xs sm:text-sm"
          >
            <span className="truncate">{selectedBrand}</span>
            {selectedBrand !== 'All' ? (
              <X
                className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onBrandChange('All');
                  setShowBrandDropdown(false);
                }}
              />
            ) : (
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            )}
          </button>

          {showBrandDropdown && (
            <div className="absolute top-full left-0 mt-2 w-full sm:w-48 bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-lg shadow-2xl z-10 max-h-64 overflow-y-auto animate-fade-in-down">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => {
                    onBrandChange(brand);
                    setShowBrandDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-700 transition-all duration-300 transform hover:translate-x-1 ${
                    selectedBrand === brand ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' : 'text-gray-300'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
