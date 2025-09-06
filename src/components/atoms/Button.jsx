import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = React.forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const variants = {
    primary: "btn-primary",
    secondary: "btn-secondary", 
    accent: "btn-accent",
    ghost: "btn-ghost",
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonClass = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className
  );

  return (
    <motion.button
      ref={ref}
      className={buttonClass}
      disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      {...props}
    >
      {loading && (
        <ApperIcon name="Loader2" size={16} className="animate-spin" />
      )}
      
      {!loading && icon && iconPosition === "left" && (
        <ApperIcon name={icon} size={16} />
      )}
      
      {children}
      
      {!loading && icon && iconPosition === "right" && (
        <ApperIcon name={icon} size={16} />
      )}
    </motion.button>
  );
});

Button.displayName = "Button";

export default Button;