import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '',
  hover = true,
  padding = 'medium',
  shadow = 'medium',
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-white border border-notion-gray-200 rounded-lg transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };
  
  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-notion-card',
    large: 'shadow-lg'
  };
  
  const hoverClasses = hover ? 'hover:shadow-notion-card-hover hover:border-notion-gray-300' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';
  
  const cardClasses = `
    ${baseClasses}
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${hoverClasses}
    ${clickableClasses}
    ${className}
  `.trim();

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: hover ? { y: -2, scale: 1.01 } : {},
    tap: onClick ? { scale: 0.98 } : {}
  };

  return (
    <motion.div
      className={cardClasses}
      onClick={onClick}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;