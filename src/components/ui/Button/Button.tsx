"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "medium", fullWidth = false, className = "", children, ...props }, ref) => {
    const classNames = [
      styles.button,
      styles[variant],
      styles[size],
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classNames} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
