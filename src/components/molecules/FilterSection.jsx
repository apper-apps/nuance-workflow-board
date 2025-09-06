import { motion } from "framer-motion";
import { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const FilterSection = ({ filters, onFilterChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [salaryRange, setSalaryRange] = useState({
    min: filters.salaryMin || "",
    max: filters.salaryMax || ""
  });

  const jobTypes = ["Full-time", "Part-time", "Contract"];
  const experienceLevels = ["Junior", "Mid-level", "Senior"];
  const datePostedOptions = [
    { value: "24h", label: "Last 24 hours" },
    { value: "3d", label: "Last 3 days" },
    { value: "7d", label: "Last week" },
    { value: "30d", label: "Last month" }
  ];

  const handleJobTypeChange = (type) => {
    const currentTypes = filters.jobType || [];
    const updatedTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    onFilterChange({ jobType: updatedTypes });
  };

  const handleExperienceChange = (level) => {
    const currentLevels = filters.experienceLevel || [];
    const updatedLevels = currentLevels.includes(level)
      ? currentLevels.filter(l => l !== level)
      : [...currentLevels, level];
    onFilterChange({ experienceLevel: updatedLevels });
  };

  const handleSalaryChange = (field, value) => {
    const numericValue = value ? parseInt(value) : "";
    setSalaryRange(prev => ({ ...prev, [field]: value }));
    onFilterChange({ [`salary${field.charAt(0).toUpperCase()}${field.slice(1)}`]: numericValue });
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
    <div className="bg-white rounded-lg shadow-card border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {activeFiltersCount > 0 && (
              <Badge variant="primary">
                {activeFiltersCount}
              </Badge>
            )}
          </div>
          <ApperIcon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-gray-400"
          />
        </button>
      </div>

      <motion.div
        initial={false}
        animate={{ height: isExpanded ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="p-6 space-y-6">
          {/* Location Filter */}
          <div>
            <Input
              label="Location"
              value={filters.location || ""}
              onChange={(e) => onFilterChange({ location: e.target.value })}
              placeholder="City, state, or remote"
              icon="MapPin"
            />
          </div>

          {/* Job Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Job Type
            </label>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <label key={type} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.jobType || []).includes(type)}
                    onChange={() => handleJobTypeChange(type)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Experience Level
            </label>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <label key={level} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={(filters.experienceLevel || []).includes(level)}
                    onChange={() => handleExperienceChange(level)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Salary Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Salary Range (USD)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                value={salaryRange.min}
                onChange={(e) => handleSalaryChange("min", e.target.value)}
                placeholder="Min salary"
                icon="DollarSign"
              />
              <Input
                type="number"
                value={salaryRange.max}
                onChange={(e) => handleSalaryChange("max", e.target.value)}
                placeholder="Max salary"
                icon="DollarSign"
              />
            </div>
          </div>

          {/* Remote Work Filter */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.remote === true}
                onChange={(e) => onFilterChange({ remote: e.target.checked ? true : undefined })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-gray-700">Remote work available</span>
            </label>
          </div>

          {/* Date Posted Filter */}
          <div>
            <Select
              label="Date Posted"
              value={filters.datePosted || ""}
              onChange={(e) => onFilterChange({ datePosted: e.target.value || undefined })}
              placeholder="Any time"
            >
              {datePostedOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {/* Clear Filters Button */}
          {activeFiltersCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="pt-4 border-t border-gray-100"
            >
              <Button
                variant="ghost"
                onClick={onClearFilters}
                icon="X"
                className="w-full"
              >
                Clear All Filters
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FilterSection;