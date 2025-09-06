import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Empty from "@/components/ui/Empty";

const Applications = () => {
  const navigate = useNavigate();

  const handleFindJobs = () => {
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
              My{" "}
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                Applications
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              Track the status of your job applications in one place
            </p>
          </div>
        </motion.div>

        {/* Empty State */}
        <Empty 
          type="applications" 
          onAction={handleFindJobs} 
          actionLabel="Find Jobs to Apply"
        />
      </div>
    </div>
  );
};

export default Applications;