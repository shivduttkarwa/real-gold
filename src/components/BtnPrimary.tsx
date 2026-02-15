import { CSSProperties } from "react";
import "./BtnPrimary.css";

interface BtnPrimaryProps {
  label: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  onClick?: () => void;
  className?: string;
}

export default function BtnPrimary({
  label,
  width,
  height,
  color = "#f5c45e",
  onClick,
  className = "",
}: BtnPrimaryProps) {
  const buttonStyle: CSSProperties = {
    width: width ? (typeof width === "number" ? `${width}px` : width) : "auto",
    height: height
      ? typeof height === "number"
        ? `${height}px`
        : height
      : "auto",
    // @ts-ignore - CSS custom properties
    "--btn-primary-color": color,
  };

  return (
    <button
      className={`btn-primary ${className}`}
      style={buttonStyle}
      onClick={onClick}
    >
      <span className="bp-bg"></span>
      <span className="bp-shine"></span>
      <span className="bp-glow"></span>
      <span className="bp-content">
        <span className="bp-label">{label}</span>
        <span className="bp-arrow">
          <span className="bp-arrow-line"></span>
          <span className="bp-arrow-head"></span>
        </span>
      </span>
    </button>
  );
}
