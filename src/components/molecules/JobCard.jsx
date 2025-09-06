import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { format, formatDistanceToNow } from "date-fns";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";
import savedJobService from "@/services/api/savedJobService";

const JobCard = ({ job, isSaved = false, onSavedChange, showSaveButton = true }) => {
  const navigate = useNavigate();
  const [isLoadingSave, setIsLoadingSave] = useState(false);

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

  const handleSaveToggle = async (e) => {
    e.stopPropagation();
    
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

  const handleCardClick = () => {
    navigate(`/jobs/${job.Id}`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="card card-hover cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-6">
        {/* Header with title, company and save button */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-1 truncate">
              {job.title}
            </h3>
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="Building2" size={16} />
              <span className="font-medium">{job.company}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 mt-1">
              <ApperIcon name="MapPin" size={16} />
              <span>{job.location}</span>
              {job.remote && (
                <Badge variant="remote" className="ml-2">
                  Remote
                </Badge>
              )}
            </div>
          </div>
          
          {showSaveButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveToggle}
              loading={isLoadingSave}
              className="shrink-0 ml-4"
            >
              <ApperIcon 
                name={isSaved ? "Heart" : "Heart"} 
                size={20} 
                className={isSaved ? "text-red-500 fill-current" : "text-gray-400"}
              />
            </Button>
          )}
        </div>

        {/* Job details badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant={getJobTypeBadgeVariant(job.type)}>
            {job.type}
          </Badge>
          <Badge variant={getExperienceBadgeVariant(job.experienceLevel)}>
            {job.experienceLevel}
          </Badge>
          {job.tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Job description preview */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {job.description}
        </p>

        {/* Footer with salary and posted date */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <ApperIcon name="DollarSign" size={16} className="text-accent-500" />
            <span className="font-semibold text-accent-600">
              {formatSalary(job.salary)}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
            </span>
            
            <Button
              variant="primary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
              className="shrink-0"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;