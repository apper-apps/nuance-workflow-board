import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  onRetry, 
  type = "general",
  className = "" 
}) => {
  const getErrorConfig = () => {
    switch (type) {
      case "network":
        return {
          icon: "WifiOff",
          title: "Connection Problem",
          description: "Please check your internet connection and try again.",
          color: "text-red-500"
        };
      case "not-found":
        return {
          icon: "Search",
          title: "No Results Found",
          description: "We couldn't find what you're looking for. Try adjusting your search criteria.",
          color: "text-gray-500"
        };
      case "load-failed":
        return {
          icon: "AlertTriangle",
          title: "Failed to Load",
          description: "We're having trouble loading the content. Please try again.",
          color: "text-orange-500"
        };
      default:
        return {
          icon: "AlertCircle",
          title: "Something went wrong",
          description: message,
          color: "text-red-500"
        };
    }
  };

  const config = getErrorConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center p-12 text-center ${className}`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`w-20 h-20 ${config.color} mb-6`}
      >
        <ApperIcon name={config.icon} size={80} />
      </motion.div>
      
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-gray-900 mb-2"
      >
        {config.title}
      </motion.h3>
      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-600 mb-8 max-w-md leading-relaxed"
      >
        {config.description}
      </motion.p>

      {onRetry && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={onRetry}
          className="btn-primary inline-flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="RefreshCw" size={16} />
          Try Again
        </motion.button>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6 text-sm text-gray-500"
      >
        If this problem persists, please contact our support team.
      </motion.div>
    </motion.div>
  );
};

export default Error;