import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Empty from "@/components/ui/Empty";

const Alerts = () => {
  const navigate = useNavigate();

  const handleBrowseJobs = () => {
    navigate("/");
  };

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
              Job{" "}
              <span className="bg-gradient-to-r from-secondary-600 to-primary-600 bg-clip-text text-transparent">
                Alerts
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Get notified when new jobs match your criteria
            </p>
          </div>
        </motion.div>

        {/* Coming Soon Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-card border border-gray-100 p-12 text-center"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-secondary-500 to-primary-500 text-white rounded-full flex items-center justify-center mb-8 mx-auto shadow-premium">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
            </motion.div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Job Alerts Coming Soon!
          </h3>
          
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed text-lg">
            We're working on a powerful job alert system that will notify you when new positions matching your preferences become available. Stay tuned!
          </p>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-md mx-auto">
              <h4 className="font-semibold text-blue-900 mb-2">Coming Features:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Custom search alerts</li>
                <li>• Email notifications</li>
                <li>• Salary range alerts</li>
                <li>• Location-based alerts</li>
              </ul>
            </div>
            
            <button
              onClick={handleBrowseJobs}
              className="bg-gradient-to-r from-secondary-500 to-primary-500 text-white px-8 py-4 rounded-lg font-semibold shadow-premium hover:shadow-card-hover transform hover:scale-105 transition-all duration-200 inline-flex items-center gap-3"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              Browse Jobs Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Alerts;