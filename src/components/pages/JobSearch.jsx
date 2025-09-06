import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import JobList from "@/components/organisms/JobList";
import FilterSection from "@/components/molecules/FilterSection";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const JobSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    keywords: searchParams.get("search") || "",
    location: "",
    jobType: [],
    experienceLevel: [],
    salaryMin: undefined,
    salaryMax: undefined,
    remote: undefined,
    datePosted: undefined
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Update filters when search params change
  useEffect(() => {
    const searchQuery = searchParams.get("search") || "";
    if (searchQuery !== filters.keywords) {
      setFilters(prev => ({ ...prev, keywords: searchQuery }));
    }
  }, [searchParams]);

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    // Update URL with search query
    if (updatedFilters.keywords) {
      setSearchParams({ search: updatedFilters.keywords });
    } else {
      setSearchParams({});
    }
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      keywords: filters.keywords, // Keep search query
      location: "",
      jobType: [],
      experienceLevel: [],
      salaryMin: undefined,
      salaryMax: undefined,
      remote: undefined,
      datePosted: undefined
    };
    setFilters(clearedFilters);
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.location) count++;
    if (filters.jobType?.length) count += filters.jobType.length;
    if (filters.experienceLevel?.length) count += filters.experienceLevel.length;
    if (filters.salaryMin || filters.salaryMax) count++;
    if (filters.remote !== undefined) count++;
    if (filters.datePosted) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
{/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Next{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Opportunity
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover thousands of job opportunities from top companies. 
              Filter by location, salary, experience level, and more.
            </p>
            
            <div className="flex justify-center gap-4 mt-6">
              <Button
                variant="outline"
                onClick={() => window.location.href = '/companies'}
                icon="Building2"
              >
                Browse Companies
              </Button>
            </div>
          </div>
        </motion.div>

<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between p-4 bg-white rounded-lg shadow-card border border-gray-100 hover:shadow-card-hover transition-shadow duration-200"
            >
              <div className="flex items-center gap-3">
                <ApperIcon name="Filter" size={20} className="text-primary-600" />
                <span className="font-semibold text-gray-900">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <ApperIcon 
                name={isFilterOpen ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-gray-400"
              />
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${isFilterOpen ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-24">
              <FilterSection
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <JobList
              filters={filters}
              searchQuery={filters.keywords}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;