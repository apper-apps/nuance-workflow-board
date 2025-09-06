import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CompanyCard from "@/components/molecules/CompanyCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import companyService from "@/services/api/companyService";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = companies.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry?.some(ind => 
          ind.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies(companies);
    }
  }, [companies, searchQuery]);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await companyService.getAll();
      setCompanies(data);
      setFilteredCompanies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleRetry = () => {
    loadCompanies();
  };

  if (loading) {
    return <Loading type="companies" />;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Discover Amazing{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Companies
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore top companies and learn about their culture, values, and open positions.
            </p>
          </div>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="max-w-2xl mx-auto">
            <SearchBar
              placeholder="Search companies by name, location, or industry..."
              onSearch={handleSearch}
              className="w-full"
            />
          </div>
        </motion.div>

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-6 bg-white rounded-lg shadow-card border border-gray-100"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {filteredCompanies.length} Companies Found
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              {searchQuery ? `Filtered by "${searchQuery}"` : "Showing all companies"}
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ApperIcon name="Building2" size={16} />
            <span>Browse by company profiles</span>
          </div>
        </motion.div>

        {/* Companies Grid */}
        {filteredCompanies.length === 0 ? (
          <Empty
            title="No Companies Found"
            description={
              searchQuery 
                ? `No companies match "${searchQuery}". Try adjusting your search terms.`
                : "No companies are available at the moment."
            }
            icon="Building2"
            actionText={searchQuery ? "Clear Search" : "Refresh"}
            onAction={searchQuery ? () => setSearchQuery("") : handleRetry}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CompanyCard company={company} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Companies;