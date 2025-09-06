import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-toastify";
import { format, formatDistanceToNow } from "date-fns";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import savedJobService from "@/services/api/savedJobService";

const JobDetailHeader = ({ job, isSaved, onSavedChange }) => {
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingApply, setIsLoadingApply] = useState(false);

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

  const getExperienceBadgeVariant = (level) => {
    switch (level?.toLowerCase()) {
      case "junior":
        return "success";
      case "mid-level":
        return "warning";
      case "senior":
        return "error";
      default:
        return "default";
    }
  };

  const handleSaveToggle = async () => {
    if (isLoadingSave) return;
    
    setIsLoadingSave(true);
    
    try {
      if (isSaved) {
        await savedJobService.deleteByJobId(job.Id);
        toast.success("Job removed from saved list");
        if (onSavedChange) {
          onSavedChange(job.Id, false);
        }
      } else {
        await savedJobService.create(job.Id);
        toast.success("Job saved successfully!");
        if (onSavedChange) {
          onSavedChange(job.Id, true);
        }
      }
    } catch (error) {
      if (error.message === "Job is already saved") {
        toast.info("This job is already in your saved list");
      } else {
        toast.error("Failed to save job. Please try again.");
      }
    } finally {
      setIsLoadingSave(false);
    }
  };

  const handleApply = async () => {
    setIsLoadingApply(true);
    
    // Simulate application process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast.success("Application submitted successfully!");
    setIsLoadingApply(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-surface border border-gray-200 rounded-lg shadow-card p-8"
    >
      {/* Job Title and Company */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {job.title}
        </h1>
        
        <div className="flex items-center gap-4 text-lg text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <ApperIcon name="Building2" size={20} />
            <span className="font-semibold">{job.company}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <ApperIcon name="MapPin" size={20} />
            <span>{job.location}</span>
          </div>
        </div>

        {/* Job Meta Information */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant={getJobTypeBadgeVariant(job.type)} className="text-sm">
            {job.type}
          </Badge>
          
          <Badge variant={getExperienceBadgeVariant(job.experienceLevel)} className="text-sm">
            {job.experienceLevel}
          </Badge>
          
          {job.remote && (
            <Badge variant="remote" className="text-sm">
              Remote Work Available
            </Badge>
          )}

          {job.tags?.map((tag, index) => (
            <Badge key={index} variant="primary" className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Salary and Dates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-white rounded-lg border border-gray-100">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ApperIcon name="DollarSign" size={24} className="text-accent-500" />
            <span className="text-sm font-medium text-gray-600">Salary</span>
          </div>
          <div className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
            {formatSalary(job.salary)}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ApperIcon name="Calendar" size={24} className="text-primary-500" />
            <span className="text-sm font-medium text-gray-600">Posted</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <ApperIcon name="Clock" size={24} className="text-secondary-500" />
            <span className="text-sm font-medium text-gray-600">Deadline</span>
          </div>
          <div className="text-lg font-semibold text-gray-900">
            {format(new Date(job.applicationDeadline), "MMM d, yyyy")}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <Button
          variant="accent"
          size="lg"
          onClick={handleApply}
          loading={isLoadingApply}
          icon="Send"
          className="flex-1 md:flex-none"
        >
          Apply Now
        </Button>
        
        <Button
          variant={isSaved ? "secondary" : "outline"}
          size="lg"
          onClick={handleSaveToggle}
          loading={isLoadingSave}
          icon="Heart"
          className="flex-1 md:flex-none"
        >
          {isSaved ? "Saved" : "Save Job"}
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          icon="Share2"
          className="flex-1 md:flex-none"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Job link copied to clipboard!");
          }}
        >
          Share
        </Button>
      </div>
    </motion.div>
  );
};

export default JobDetailHeader;