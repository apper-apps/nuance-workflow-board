import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";
import jobService from "@/services/api/jobService";

const SearchBar = ({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Search jobs, companies, or keywords...",
  className = "" 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoading(true);
    try {
      const results = await jobService.searchSuggestions(query);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Debounce suggestions fetch
    timeoutRef.current = setTimeout(() => {
      fetchSuggestions(newValue);
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(suggestion);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          icon="Search"
          className="pr-16"
        />
        
        <button
          type="submit"
          className="absolute inset-y-0 right-0 px-4 bg-gradient-primary text-white rounded-r-lg hover:opacity-90 transition-opacity duration-200 flex items-center justify-center"
        >
          <ApperIcon name="Search" size={20} />
        </button>
      </form>

      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-premium border border-gray-200 z-50 overflow-hidden"
          >
            {isLoading ? (
              <div className="p-4 text-center text-gray-500">
                <ApperIcon name="Loader2" size={20} className="animate-spin mx-auto mb-2" />
                <span className="text-sm">Searching...</span>
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 flex items-center gap-3"
                  >
                    <ApperIcon name="Search" size={16} className="text-gray-400" />
                    <span className="text-gray-900">{suggestion}</span>
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;