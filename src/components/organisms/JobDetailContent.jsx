import { motion } from "framer-motion";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const JobDetailContent = ({ job }) => {
  const renderSection = (title, content, icon) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg shadow-card border border-gray-100 p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white">
          <ApperIcon name={icon} size={20} />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="text-gray-700 leading-relaxed">{content}</div>
    </motion.div>
  );

  const renderRequirements = () => (
    <div className="space-y-3">
      {job.requirements?.map((requirement, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 shrink-0" />
          <span>{requirement}</span>
        </div>
      ))}
    </div>
  );

  const renderBenefits = () => (
    <div className="space-y-3">
      {job.benefits?.map((benefit, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 shrink-0" />
          <span>{benefit}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Job Description */}
      {renderSection(
        "Job Description",
        <div className="space-y-4">
          <p>{job.description}</p>
          
          {job.tags && job.tags.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Key Skills & Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, index) => (
                  <Badge key={index} variant="primary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>,
        "FileText"
      )}

      {/* Requirements and Benefits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Requirements */}
        {job.requirements && job.requirements.length > 0 && 
          renderSection("Requirements", renderRequirements(), "CheckCircle")
        }

        {/* Benefits */}
        {job.benefits && job.benefits.length > 0 &&
          renderSection("Benefits", renderBenefits(), "Gift")
        }
      </div>

      {/* Company Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-surface rounded-lg shadow-card border border-gray-100 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center text-white">
            <ApperIcon name="Building2" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">About {job.company}</h3>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            Join {job.company} and become part of a team that values innovation, collaboration, and professional growth. 
            We offer a dynamic work environment where your contributions make a real impact.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="MapPin" size={18} className="text-primary-500" />
              <span>{job.location}</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="Users" size={18} className="text-secondary-500" />
              <span>Growing team</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600">
              <ApperIcon name="Briefcase" size={18} className="text-accent-500" />
              <span>{job.type} position</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Application Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-card border border-gray-100 p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center text-white">
            <ApperIcon name="Send" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">How to Apply</h3>
        </div>
        
        <div className="space-y-3 text-gray-700">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5">
              1
            </div>
            <span>Click the "Apply Now" button above to submit your application</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5">
              2
            </div>
            <span>Prepare your resume and cover letter highlighting relevant experience</span>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5">
              3
            </div>
            <span>Include examples of your work that demonstrate the required skills</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetailContent;