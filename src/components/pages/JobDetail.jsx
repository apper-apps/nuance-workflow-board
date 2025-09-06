import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import JobDetailHeader from "@/components/molecules/JobDetailHeader";
import JobDetailContent from "@/components/organisms/JobDetailContent";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import jobService from "@/services/api/jobService";
import savedJobService from "@/services/api/savedJobService";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const loadJob = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const jobData = await jobService.getById(id);
      setJob(jobData);
      
      // Check if job is saved
      const savedStatus = await savedJobService.isJobSaved(id);
      setIsSaved(savedStatus);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadJob();
    }
  }, [id]);

  const handleSavedChange = (jobId, savedStatus) => {
    setIsSaved(savedStatus);
  };

  const handleRetry = () => {
    loadJob();
  };

  const handleBackToJobs = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Loading type="job-detail" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleBackToJobs}
              icon="ArrowLeft"
              className="mb-4"
            >
              Back to Jobs
            </Button>
          </div>
          <Error 
            message={error} 
            onRetry={handleRetry} 
            type={error.includes("not found") ? "not-found" : "load-failed"}
          />
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error 
            message="Job not found" 
            onRetry={handleBackToJobs} 
            type="not-found"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={handleBackToJobs}
            icon="ArrowLeft"
            className="hover:bg-white hover:shadow-card"
          >
            Back to Jobs
          </Button>
        </motion.div>

        {/* Job Header */}
        <div className="mb-8">
          <JobDetailHeader
            job={job}
            isSaved={isSaved}
            onSavedChange={handleSavedChange}
          />
        </div>

        {/* Job Content */}
        <JobDetailContent job={job} />

        {/* Similar Jobs CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="bg-white rounded-lg shadow-card border border-gray-100 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Looking for More Opportunities?
            </h3>
            <p className="text-gray-600 mb-6">
              Explore thousands of other job openings that match your skills and interests.
            </p>
            <Button
              variant="primary"
              onClick={handleBackToJobs}
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

export default JobDetail;