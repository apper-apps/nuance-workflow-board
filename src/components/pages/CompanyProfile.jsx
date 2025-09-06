import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import JobCard from "@/components/molecules/JobCard";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import companyService from "@/services/api/companyService";
import jobService from "@/services/api/jobService";
import savedJobService from "@/services/api/savedJobService";

const CompanyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCompanyData();
  }, [id]);

  const loadCompanyData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [companyData, jobsData, savedJobsData] = await Promise.all([
        companyService.getById(parseInt(id)),
        jobService.getByCompany(parseInt(id)),
        savedJobService.getAll()
      ]);
      
      setCompany(companyData);
      setJobs(jobsData);
      setSavedJobs(savedJobsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSavedChange = (jobId, isSaved) => {
    if (isSaved) {
      setSavedJobs(prev => [...prev, { jobId, savedDate: new Date().toISOString() }]);
    } else {
      setSavedJobs(prev => prev.filter(saved => saved.jobId !== jobId));
    }
  };

  const handleRetry = () => {
    loadCompanyData();
  };

  const getSizeBadgeVariant = (size) => {
    switch (size?.toLowerCase()) {
      case "startup":
        return "warning";
      case "small":
        return "success";
      case "medium":
        return "primary";
      case "large":
        return "secondary";
      case "enterprise":
        return "accent";
      default:
        return "default";
    }
  };

  if (loading) {
    return <Loading type="job-detail" />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12">
        <Error
          message={error}
          onRetry={handleRetry}
          type="load-failed"
        />
      </div>
    );
  }

  if (!company) {
    return (
      <div className="container mx-auto px-6 py-12">
        <Error
          message="Company not found"
          type="not-found"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/companies")}
            icon="ArrowLeft"
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Companies
          </Button>
        </motion.div>

        {/* Company Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card mb-8"
        >
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="w-24 h-24 bg-gradient-primary rounded-xl flex items-center justify-center text-white font-bold text-2xl shrink-0">
                {company.logo || company.name.charAt(0)}
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {company.name}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <ApperIcon name="MapPin" size={16} />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ApperIcon name="Users" size={16} />
                    <span>{company.employees || "50-200"} employees</span>
                  </div>
                  {company.founded && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <ApperIcon name="Calendar" size={16} />
                      <span>Founded {company.founded}</span>
                    </div>
                  )}
                  {company.website && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <ApperIcon name="Globe" size={16} />
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        Website
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant={getSizeBadgeVariant(company.size)}>
                    {company.size}
                  </Badge>
                  <Badge variant="accent">
                    {jobs.length} open positions
                  </Badge>
                  {company.industry?.map((tag, index) => (
                    <Badge key={index} variant="primary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed">
                  {company.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Open Positions ({jobs.length})
            </h2>
            {jobs.length > 0 && (
              <Button
                variant="outline"
                onClick={() => navigate(`/?search=${encodeURIComponent(company.name)}`)}
                icon="Filter"
              >
                View All Jobs
              </Button>
            )}
          </div>

          {jobs.length === 0 ? (
            <Empty
              title="No Open Positions"
              description={`${company.name} doesn't have any open positions at the moment. Check back later for new opportunities.`}
              icon="Briefcase"
              actionText="Browse Other Companies"
              onAction={() => navigate("/companies")}
            />
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.Id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <JobCard
                    job={job}
                    isSaved={savedJobs.some(saved => saved.jobId === job.Id)}
                    onSavedChange={handleSavedChange}
                    showSaveButton={true}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CompanyProfile;