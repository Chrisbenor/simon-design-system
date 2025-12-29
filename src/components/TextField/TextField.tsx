// TextField.tsx
import React from "react";
import "./TextField.css";

export type TextFieldSize = "s" | "m" | "l";
export type TextFieldState = "default" | "error";

export interface TextFieldProps {
  id?: string;

  label?: string;
  required?: boolean;

  /** Help icon al lado del label */
  helpAriaLabel?: string;
  onHelpClick?: () => void;
  helpIcon?: React.ReactNode;

  placeholder?: string;
  value?: string;
  disabled?: boolean;

  /** m = 36px (Figma). s/l opcionales */
  size?: TextFieldSize;

  state?: TextFieldState;
  helperText?: string;

  /** SIEMPRE 2 ICONOS (left y right) */
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;

  onChange?: (value: string) => void;
}

function makeId(seed?: string) {
  if (seed) return seed;
  return `tf_${Math.random().toString(16).slice(2)}`;
}

const DefaultLeftIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm0 6.2a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-1 4.2h2v7h-2v-7Z"
      fill="currentColor"
    />
  </svg>
);

const DefaultRightIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm4.2 11.2H12v-2h4.2l-1.6-1.6 1.4-1.4 4 4-4 4-1.4-1.4 1.6-1.6Z"
      fill="currentColor"
    />
  </svg>
);

export function TextField({
  id: idProp,

  label,
  required = false,

  helpAriaLabel = "Ayuda",
  onHelpClick,
  helpIcon,

  placeholder,
  value,
  disabled = false,

  size = "m",
  state = "default",
  helperText,

  leftIcon,
  rightIcon,

  onChange,
}: TextFieldProps) {
  const id = React.useMemo(() => makeId(idProp), [idProp]);

  const rootClassName = [
    "textfield",
    disabled ? "textfield--disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const controlClassName = [
    "textfield__control",
    `textfield__control--${size}`,
    state === "error" ? "textfield__control--error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const helperClassName = [
    "textfield__helper",
    state === "error" ? "textfield__helper--error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const hasHelp = Boolean(onHelpClick);

  return (
    <div className={rootClassName}>
      {(label || hasHelp) && (
        <div className="textfield__labelRow">
          {label && (
            <label className="textfield__label" htmlFor={id}>
              {label}
              {required && <span className="textfield__required">*</span>}
            </label>
          )}

          {hasHelp && (
            <button
              type="button"
              className="textfield__help"
              aria-label={helpAriaLabel}
              onClick={onHelpClick}
              disabled={disabled}
            >
              {helpIcon ?? <span className="textfield__helpDefaultIcon">i</span>}
            </button>
          )}
        </div>
      )}

      <div className={controlClassName} aria-disabled={disabled ? "true" : "false"}>
        {/* SIEMPRE left icon */}
        <span className="textfield__icon textfield__icon--left" aria-hidden="true">
          {leftIcon ?? DefaultLeftIcon}
        </span>

        <input
          id={id}
          className="textfield__input"
          type="text"
          placeholder={placeholder}
          value={value ?? ""}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />

        {/* SIEMPRE right icon */}
        <span className="textfield__icon textfield__icon--right" aria-hidden="true">
          {rightIcon ?? DefaultRightIcon}
        </span>
      </div>

      {helperText && <div className={helperClassName}>{helperText}</div>}
    </div>
  );
}
