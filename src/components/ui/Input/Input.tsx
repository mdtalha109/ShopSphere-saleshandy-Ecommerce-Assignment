"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "text" | "email" | "password" | "number" | "checkbox" | "search";
  inputSize?: "small" | "medium" | "large";
  fullWidth?: boolean;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "text",
      inputSize = "medium",
      fullWidth = true,
      error = false,
      className = "",
      type,
      ...props
    },
    ref
  ) => {
    const inputType = type || variant;

    const classNames = [
      styles.input,
      styles[variant],
      variant !== "checkbox" && styles[inputSize],
      fullWidth && styles.fullWidth,
      error && styles.error,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return <input ref={ref} type={inputType} className={classNames} {...props} />;
  }
);

Input.displayName = "Input";

export default Input;
