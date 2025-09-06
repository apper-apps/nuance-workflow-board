import React from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  label,
  error,
  icon,
  iconPosition = "left",
  ...props 
}, ref) => {
  const inputClass = cn(
    "input-field",
    icon && iconPosition === "left" && "pl-12",
    icon && iconPosition === "right" && "pr-12",
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
        {icon && iconPosition === "left" && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={20} className="text-gray-400" />
          </div>
        )}
        
        <input
          type={type}
          className={inputClass}
          ref={ref}
          {...props}
        />
        
        {icon && iconPosition === "right" && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} size={20} className="text-gray-400" />
          </div>
        )}
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

Input.displayName = "Input";

export default Input;