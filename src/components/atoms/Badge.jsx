import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  children, 
  className, 
  variant = "default",
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    primary: "bg-primary-50 text-primary-700 border-primary-200",
    secondary: "bg-secondary-50 text-secondary-700 border-secondary-200", 
    accent: "bg-accent-50 text-accent-700 border-accent-200",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
    error: "bg-red-50 text-red-700 border-red-200",
    remote: "bg-blue-50 text-blue-700 border-blue-200",
    fulltime: "bg-green-50 text-green-700 border-green-200",
    parttime: "bg-orange-50 text-orange-700 border-orange-200",
    contract: "bg-purple-50 text-purple-700 border-purple-200"
  };

  const badgeClass = cn(
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
    variants[variant],
    className
  );

  return (
    <span ref={ref} className={badgeClass} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;