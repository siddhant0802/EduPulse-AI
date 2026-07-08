import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  type = "button",
  onClick,
  disabled = false,
  loading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        w-full
        rounded-xl
        bg-cyan-400
        px-5
        py-3
        text-black
        font-semibold
        transition-all
        duration-300
        hover:bg-cyan-300
        hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${className}
      `}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default PrimaryButton;