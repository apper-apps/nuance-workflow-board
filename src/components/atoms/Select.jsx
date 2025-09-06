import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = React.forwardRef(({ 
  className, 
  children,
  label,
  error,
  placeholder = "Select an option",
  ...props 
}, ref) => {
  const selectClass = cn(
    "input-field appearance-none bg-white pr-12 cursor-pointer",
    error && "border-red-500 focus:ring-red-500",
    className
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      
      <div className="relative">
        <select
          className={selectClass}
          ref={ref}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {children}
        </select>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ApperIcon name="ChevronDown" size={20} className="text-gray-400" />
        </div>
      </div>
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" size={16} />
          {error}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;