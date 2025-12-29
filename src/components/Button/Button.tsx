import React from "react";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "s" | "m" | "l";

export interface ButtonProps {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onClick?: () => void;

  /** Icono a la izquierda del texto */
  iconLeft?: React.ReactNode;
  /** Icono a la derecha del texto */
  iconRight?: React.ReactNode;

  /** Para botones sólo-ícono (accesibilidad). Si no lo pasas, usa label. */
  ariaLabel?: string;
}

export function Button({
  label,
  variant = "primary",
  size = "m",
  disabled = false,
  onClick,
  iconLeft,
  iconRight,
  ariaLabel,
}: ButtonProps) {
  const className = [
    "button",
    `button--${variant}`,
    `button--${size}`,
    disabled ? "button--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel ?? label}
      type="button"
    >
      {iconLeft ? <span className="button__icon">{iconLeft}</span> : null}
      <span className="button__label">{label}</span>
      {iconRight ? <span className="button__icon">{iconRight}</span> : null}
    </button>
  );
}
