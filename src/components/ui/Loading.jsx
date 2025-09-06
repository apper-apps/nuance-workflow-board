import { motion } from "framer-motion";

const Loading = ({ type = "jobs" }) => {
  const renderJobCardSkeleton = () => (
    <div className="card p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
        </div>
        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-14"></div>
      </div>
      
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/5"></div>
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-24"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>
    </div>
  );

  const renderJobDetailSkeleton = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card p-8">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="h-8 bg-gray-200 rounded-full animate-pulse w-20"></div>
            <div className="h-8 bg-gray-200 rounded-full animate-pulse w-24"></div>
            <div className="h-8 bg-gray-200 rounded-full animate-pulse w-16"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/5"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 pt-6 border-t border-gray-100">
            <div className="h-12 bg-gray-200 rounded animate-pulse w-32"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFilterSkeleton = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/2"></div>
        <div className="h-10 bg-gray-200 rounded animate-pulse w-full"></div>
      </div>
      
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-1/3"></div>
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-2/5"></div>
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-full"></div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-full"></div>
        </div>
      </div>
    </div>
  );

  if (type === "job-detail") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="animate-pulse p-6"
      >
        {renderJobDetailSkeleton()}
      </motion.div>
    );
  }

  if (type === "filters") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="animate-pulse p-6"
      >
        {renderFilterSkeleton()}
      </motion.div>
    );
  }

if (type === "companies") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="animate-pulse grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6"
      >
        {[...Array(6)].map((_, index) => (
          <div key={index} className="card p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                  <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/5"></div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse w-24"></div>
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  if (type === "saved-jobs") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="animate-pulse space-y-6 p-6"
      >
        {[...Array(3)].map((_, index) => (
          <div key={index} className="card p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3"></div>
              </div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            <div className="h-16 bg-gray-200 rounded animate-pulse w-full"></div>
            
            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
              <div className="flex gap-2">
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  // Default jobs loading
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="animate-pulse space-y-6 p-6"
    >
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {renderJobCardSkeleton()}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Loading;