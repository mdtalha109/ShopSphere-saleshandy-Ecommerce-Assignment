"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: "text" | "email" | "password" | "number" | "checkbox" | "search";
  inputSize?: "small" | "medium" | "large";
  fullWidth?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = "text",
      inputSize = "medium",
      fullWidth = true,
      error = false,
      errorMessage,
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

    const wrapperClassNames = [
      styles.inputWrapper,
      variant === "checkbox" && styles.checkboxWrapper,
      fullWidth && styles.fullWidth,
    ]
      .filter(Boolean)
      .join(" ");

    if (variant === "checkbox") {
      return <input ref={ref} type={inputType} className={classNames} {...props} />;
    }

    return (
      <div className={wrapperClassNames}>
        <input ref={ref} type={inputType} className={classNames} {...props} />
        {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
