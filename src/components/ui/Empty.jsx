import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  type = "jobs", 
  onAction, 
  actionLabel,
  className = "" 
}) => {
  const getEmptyConfig = () => {
    switch (type) {
      case "jobs":
        return {
          icon: "Briefcase",
          title: "No Jobs Found",
          description: "We couldn't find any jobs matching your criteria. Try adjusting your filters or search terms.",
          actionLabel: "Clear Filters",
          gradient: "from-primary-500 to-secondary-500"
        };
      case "saved-jobs":
        return {
          icon: "Heart",
          title: "No Saved Jobs Yet",
          description: "Start building your job collection by saving positions that interest you. You can save jobs from any listing page.",
          actionLabel: "Browse Jobs",
          gradient: "from-accent-500 to-primary-500"
        };
      case "search":
        return {
          icon: "Search",
          title: "Start Your Job Search",
          description: "Enter keywords, job titles, or company names to discover opportunities that match your career goals.",
          actionLabel: "View All Jobs",
          gradient: "from-secondary-500 to-accent-500"
        };
      case "applications":
        return {
          icon: "Send",
          title: "No Applications Yet",
          description: "When you apply to jobs through our platform, they'll appear here for easy tracking and management.",
          actionLabel: "Find Jobs to Apply",
          gradient: "from-primary-500 to-accent-500"
        };
      default:
        return {
          icon: "FileX",
          title: "Nothing Here Yet",
          description: "This area is empty. Check back later or try a different action.",
          actionLabel: "Go Back",
          gradient: "from-gray-400 to-gray-500"
        };
    }
  };

  const config = getEmptyConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          delay: 0.2, 
          type: "spring", 
          stiffness: 200,
          duration: 0.6 
        }}
        className={`w-24 h-24 bg-gradient-to-br ${config.gradient} text-white rounded-full flex items-center justify-center mb-8 shadow-premium`}
      >
        <ApperIcon name={config.icon} size={48} />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
      >
        {config.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md leading-relaxed text-lg"
      >
        {config.description}
      </motion.p>

      {(onAction || actionLabel) && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onAction}
          className={`bg-gradient-to-r ${config.gradient} text-white px-8 py-4 rounded-lg font-semibold shadow-premium hover:shadow-card-hover transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 inline-flex items-center gap-3`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="ArrowRight" size={20} />
          {actionLabel || config.actionLabel}
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex items-center gap-4 text-sm text-gray-500"
      >
        <div className="flex items-center gap-1">
          <ApperIcon name="Lightbulb" size={16} />
          <span>Tip: Use broader search terms for more results</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Empty;