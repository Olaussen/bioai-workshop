import React, { ReactNode } from "react";

interface ButtonProps {
  onClick?: VoidFunction;
  children?: ReactNode;
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  className,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 mt-5  text-white font-semibold rounded-lg shadow-md focus:ring-blue-900 focus:ring-opacity-75 w-80 flex items-center justify-center ${
        disabled ? "cursor-not-allowed" : " focus:outline-none focus:ring-2"
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
