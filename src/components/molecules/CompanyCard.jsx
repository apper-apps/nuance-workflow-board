import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import ApperIcon from "@/components/ApperIcon";

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/companies/${company.Id}`);
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="card card-hover cursor-pointer"
      onClick={handleViewProfile}
    >
      <div className="p-6">
        {/* Company Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shrink-0">
            {company.logo || company.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 mb-1">
              {company.name}
            </h3>
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <ApperIcon name="MapPin" size={16} />
              <span>{company.location}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant={getSizeBadgeVariant(company.size)}>
                {company.size}
              </Badge>
              <Badge variant="default">
                {company.openPositions} open positions
              </Badge>
            </div>
          </div>
        </div>

        {/* Company Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          {company.description}
        </p>

        {/* Industry Tags */}
        {company.industry && (
          <div className="flex flex-wrap gap-2 mb-4">
            {company.industry.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="primary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ApperIcon name="Users" size={16} />
              <span>{company.employees || "50-200"} employees</span>
            </div>
            {company.founded && (
              <div className="flex items-center gap-1">
                <ApperIcon name="Calendar" size={16} />
                <span>Founded {company.founded}</span>
              </div>
            )}
          </div>
          
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleViewProfile();
            }}
            className="shrink-0"
          >
            View Profile
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CompanyCard;