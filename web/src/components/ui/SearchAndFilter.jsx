import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, SortAsc, SortDesc } from 'lucide-react';
import Input from './Input';
import Button from './Button';

const SearchAndFilter = ({ 
  searchTerm, 
  onSearchChange, 
  selectedTags, 
  onTagsChange, 
  sortMethod, 
  onSortChange,
  tagFrequency,
  totalProjects,
  filteredCount
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Get top tags for display
  const topTags = useMemo(() => {
    return Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag, count]) => ({ tag, count }));
  }, [tagFrequency]);

  const sortOptions = [
    { value: 'default', label: 'Default Order', icon: null },
    { value: 'stars', label: 'Most Stars', icon: SortDesc },
    { value: 'updated-time', label: 'Recently Updated', icon: SortAsc },
  ];

  const handleTagToggle = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  const clearAllFilters = () => {
    onSearchChange('');
    onTagsChange([]);
    onSortChange('default');
  };

  const hasActiveFilters = searchTerm || selectedTags.length > 0 || sortMethod !== 'default';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Search Bar */}
      <div className="relative mb-4 sm:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          <Input
            type="text"
            placeholder="Search projects by name, description, or technology..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={Search}
          />
          {searchTerm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-notion-sm hover:bg-notion-gray-100 text-notion-gray-400 hover:text-notion-gray-600 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Filter and Sort Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center justify-between"
      >
        <div className="flex flex-wrap gap-3">
          {/* Filter Button */}
          <div className="relative">
            <Button
              variant={isFilterOpen || selectedTags.length > 0 ? 'primary' : 'secondary'}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center space-x-2"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter</span>
              {selectedTags.length > 0 && (
                <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                  {selectedTags.length}
                </span>
              )}
              <motion.div
                animate={{ rotate: isFilterOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </Button>
          </div>

          {/* Sort Button */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-notion-md border transition-all duration-200 ${
                isSortOpen || sortMethod !== 'default'
                  ? 'bg-notion-blue text-white border-notion-blue'
                  : 'bg-white text-notion-gray-600 border-notion-gray-200 hover:border-notion-gray-300'
              }`}
            >
              {sortOptions.find(opt => opt.value === sortMethod)?.icon && (
                React.createElement(sortOptions.find(opt => opt.value === sortMethod).icon, { className: 'w-4 h-4' })
              )}
              <span className="text-sm font-medium">
                {sortOptions.find(opt => opt.value === sortMethod)?.label}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                isSortOpen ? 'rotate-180' : ''
              }`} />
            </motion.button>

            {/* Sort Dropdown */}
            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white border border-notion-gray-200 rounded-notion-md shadow-notion-hover z-20"
                >
                  {sortOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ backgroundColor: 'rgb(247, 247, 245)' }}
                      onClick={() => {
                        onSortChange(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors duration-150 first:rounded-t-notion-md last:rounded-b-notion-md ${
                        sortMethod === option.value
                          ? 'bg-notion-blue text-white'
                          : 'text-notion-gray-700 hover:bg-notion-gray-50'
                      }`}
                    >
                      {option.icon && <option.icon className="w-4 h-4" />}
                      <span className="text-sm font-medium">{option.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={clearAllFilters}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-notion-gray-500 hover:text-notion-gray-700 hover:bg-notion-gray-50 rounded-notion-md transition-all duration-200"
            >
              <X className="w-4 h-4" />
              <span>Clear all</span>
            </motion.button>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-notion-gray-500">
          Showing <span className="font-medium text-notion-gray-700">{filteredCount}</span> of{' '}
          <span className="font-medium text-notion-gray-700">{totalProjects}</span> projects
        </div>
      </motion.div>

      {/* Filter Tags Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-notion-gray-200 rounded-notion-lg p-6 space-y-4"
          >
            <h3 className="text-sm font-semibold text-notion-gray-700 mb-3">
              Filter by Technology
            </h3>
            <div className="flex flex-wrap gap-2">
              {topTags.map(({ tag, count }) => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? 'primary' : 'secondary'}
                  size="small"
                  onClick={() => handleTagToggle(tag)}
                  className="flex items-center space-x-1 sm:space-x-2 justify-start text-xs sm:text-sm"
                >
                  <span>{tag}</span>
                  <span className={`text-xs px-1 sm:px-1.5 py-0.5 rounded-full ${
                    selectedTags.includes(tag)
                      ? 'bg-white/20 text-white'
                      : 'bg-notion-gray-200 text-notion-gray-500'
                  }`}>
                    {count}
                  </span>
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {selectedTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-2"
        >
          <span className="text-sm text-notion-gray-500 self-center">Active filters:</span>
          {selectedTags.map((tag) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex items-center space-x-1 bg-notion-blue text-white px-3 py-1 rounded-notion-md text-sm"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleTagToggle(tag)}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors duration-150"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.span>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SearchAndFilter;