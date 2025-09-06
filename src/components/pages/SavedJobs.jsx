import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import savedJobService from "@/services/api/savedJobService";

const SavedJobs = () => {
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingIds, setDeletingIds] = useState(new Set());

  const loadSavedJobs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await savedJobService.getAll();
      setSavedJobs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedJobs();
  }, []);

  const handleRemoveSavedJob = async (savedJobId, jobId) => {
    if (deletingIds.has(savedJobId)) return;
    
    setDeletingIds(prev => new Set(prev).add(savedJobId));
    
    try {
      await savedJobService.delete(savedJobId);
      setSavedJobs(prev => prev.filter(item => item.Id !== savedJobId));
      toast.success("Job removed from saved list");
    } catch (err) {
      toast.error("Failed to remove job. Please try again.");
    } finally {
      setDeletingIds(prev => {
        const updated = new Set(prev);
        updated.delete(savedJobId);
        return updated;
      });
    }
  };

  const handleViewJob = (jobId) => {
    navigate(`/jobs/${jobId}`);
  };

  const handleBrowseJobs = () => {
    navigate("/");
  };

  const handleRetry = () => {
    loadSavedJobs();
  };

  const formatSalary = (salary) => {
    if (!salary) return "Salary not specified";
    
    if (salary.min === salary.max) {
      return `$${salary.min.toLocaleString()}`;
    }
    
    // Handle hourly rates for contract positions
    if (salary.min < 1000) {
      return `$${salary.min}-${salary.max}/hour`;
    }
    
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
  };

  const getJobTypeBadgeVariant = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time":
        return "fulltime";
      case "part-time":
        return "parttime";
      case "contract":
        return "contract";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading type="saved-jobs" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={handleRetry} type="load-failed" />
        </div>
      </div>
    );
  }

  if (savedJobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Empty type="saved-jobs" onAction={handleBrowseJobs} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your{" "}
              <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                Saved Jobs
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              {savedJobs.length} job{savedJobs.length === 1 ? "" : "s"} saved for later review
            </p>
          </div>
        </motion.div>

        {/* Saved Jobs List */}
        <div className="space-y-6">
          <AnimatePresence>
            {savedJobs.map((savedJob, index) => {
              const job = savedJob.job;
              const isDeleting = deletingIds.has(savedJob.Id);

              return (
                <motion.div
                  key={savedJob.Id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: isDeleting ? 0.5 : 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-lg shadow-card border border-gray-100 overflow-hidden hover:shadow-card-hover transition-shadow duration-200"
                >
                  <div className="p-6">
                    {/* Job Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-2">
                          <div className="flex items-center gap-2">
                            <ApperIcon name="Building2" size={16} />
                            <span className="font-medium">{job.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <ApperIcon name="MapPin" size={16} />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant={getJobTypeBadgeVariant(job.type)}>
                            {job.type}
                          </Badge>
                          <Badge variant="default">
                            {job.experienceLevel}
                          </Badge>
                          {job.remote && (
                            <Badge variant="remote">
                              Remote
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSavedJob(savedJob.Id, job.Id)}
                        loading={isDeleting}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0"
                      >
                        <ApperIcon name="Trash2" size={16} />
                      </Button>
                    </div>

                    {/* Saved Notes */}
                    {savedJob.notes && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-start gap-2">
                          <ApperIcon name="StickyNote" size={16} className="text-blue-600 mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-blue-900 mb-1">Your Notes:</p>
                            <p className="text-sm text-blue-800">{savedJob.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Job Description Preview */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-accent-600">
                          <ApperIcon name="DollarSign" size={16} />
                          <span className="font-semibold">
                            {formatSalary(job.salary)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Saved {formatDistanceToNow(new Date(savedJob.savedDate), { addSuffix: true })}</span>
                          <span>•</span>
                          <span>Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewJob(job.Id)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleViewJob(job.Id)}
                          icon="ExternalLink"
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Browse More Jobs CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-lg shadow-card border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Ready to Find More Opportunities?
            </h3>
            <p className="text-gray-600 mb-6">
              Continue your job search and discover new positions that match your career goals.
            </p>
            <Button
              variant="primary"
              onClick={handleBrowseJobs}
              icon="Search"
              size="lg"
            >
              Browse All Jobs
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SavedJobs;