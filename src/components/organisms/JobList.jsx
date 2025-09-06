import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JobCard from "@/components/molecules/JobCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import jobService from "@/services/api/jobService";
import savedJobService from "@/services/api/savedJobService";

const JobList = ({ filters = {}, searchQuery = "" }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("date");

  const jobsPerPage = 10;

  const loadJobs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const allFilters = {
        ...filters,
        keywords: searchQuery
      };
      
      const jobsData = await jobService.getAll(allFilters);
      
      // Sort jobs based on sortBy criteria
      const sortedJobs = [...jobsData].sort((a, b) => {
        switch (sortBy) {
          case "salary":
            return b.salary.max - a.salary.max;
          case "company":
            return a.company.localeCompare(b.company);
          case "title":
            return a.title.localeCompare(b.title);
          case "date":
          default:
            return new Date(b.postedDate) - new Date(a.postedDate);
        }
      });
      
      setJobs(sortedJobs);
      setCurrentPage(1);
      
      // Load saved jobs status
      const savedJobsData = await savedJobService.getAll();
      const savedJobIds = new Set(savedJobsData.map(saved => saved.jobId));
      setSavedJobs(savedJobIds);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, [filters, searchQuery, sortBy]);

  const handleSavedChange = (jobId, isSaved) => {
    setSavedJobs(prev => {
      const updated = new Set(prev);
      if (isSaved) {
        updated.add(jobId);
      } else {
        updated.delete(jobId);
      }
      return updated;
    });
  };

  const handleRetry = () => {
    loadJobs();
  };

  const getSortOptions = () => [
    { value: "date", label: "Most Recent", icon: "Calendar" },
    { value: "salary", label: "Highest Salary", icon: "DollarSign" },
    { value: "company", label: "Company A-Z", icon: "Building2" },
    { value: "title", label: "Job Title A-Z", icon: "Briefcase" }
  ];

  if (loading) {
    return <Loading type="jobs" />;
  }

  if (error) {
    return <Error message={error} onRetry={handleRetry} type="load-failed" />;
  }

  if (jobs.length === 0) {
    return <Empty type="jobs" onAction={handleRetry} actionLabel="Refresh Jobs" />;
  }

  // Pagination logic
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 bg-white rounded-lg shadow-card border border-gray-100">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {jobs.length} Jobs Found
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Showing {startIndex + 1}-{Math.min(endIndex, jobs.length)} of {jobs.length} results
          </p>
        </div>
        
        {/* Sort Options */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {getSortOptions().map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {currentJobs.map((job, index) => (
            <motion.div
              key={job.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <JobCard
                job={job}
                isSaved={savedJobs.has(job.Id)}
                onSavedChange={handleSavedChange}
                showSaveButton={true}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-8">
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            icon="ChevronLeft"
            size="sm"
          >
            Previous
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-primary-600 text-white shadow-card"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <Button
            variant="ghost"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            icon="ChevronRight"
            iconPosition="right"
            size="sm"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobList;