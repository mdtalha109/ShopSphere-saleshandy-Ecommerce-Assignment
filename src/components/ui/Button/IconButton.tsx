"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import styles from "./IconButton.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // For accessibility
  variant?: "default" | "ghost";
  size?: "small" | "medium" | "large";
  badge?: number | string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      label,
      variant = "default",
      size = "medium",
      badge,
      className = "",
      ...props
    },
    ref
  ) => {
    const classNames = [
      styles.iconButton,
      styles[variant],
      styles[size],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classNames}
        aria-label={label}
        title={label}
        {...props}
      >
        <span className={styles.icon}>{icon}</span>
        {badge !== undefined && (
          <span className={styles.badge} aria-live="polite">
            {badge}
          </span>
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
