import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Input = forwardRef(({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error = false,
  className = '',
  icon: Icon,
  ...props 
}, ref) => {
  const baseClasses = 'w-full px-4 py-2.5 text-notion-gray-900 bg-white border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0';
  
  const stateClasses = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
    : 'border-notion-gray-300 focus:border-notion-blue-500 focus:ring-notion-blue-200 hover:border-notion-gray-400';
  
  const disabledClasses = 'opacity-50 cursor-not-allowed bg-notion-gray-50';
  
  const inputClasses = `
    ${baseClasses}
    ${stateClasses}
    ${disabled ? disabledClasses : ''}
    ${Icon ? 'pl-10' : ''}
    ${className}
  `.trim();

  return (
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-notion-gray-400" />
        </div>
      )}
      <motion.input
        ref={ref}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
        className={inputClasses}
        whileFocus={{ scale: 1.01 }}
        transition={{ duration: 0.1 }}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';

export default Input;