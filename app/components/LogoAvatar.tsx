"use client";

import { useState } from "react";
import { getLogoUrl, getInitials, getInitialsColor } from "../lib/logos";

interface LogoAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export default function LogoAvatar({ name, size = 40, className = "" }: LogoAvatarProps) {
  const logoUrl = getLogoUrl(name);
  const [imgError, setImgError] = useState(false);

  const radius = size <= 24 ? "rounded-md" : "rounded-xl";
  const padding = size <= 24 ? "p-0.5" : "p-1.5";

  if (logoUrl && !imgError) {
    return (
      <div
        className={`${radius} bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={logoUrl}
          alt={`${name} logo`}
          width={size}
          height={size}
          className={`object-contain ${padding}`}
          onError={() => setImgError(true)}
        />
      </div>
    );
  }

  // Fallback: colored initials avatar
  const initials = getInitials(name);
  const colorClass = getInitialsColor(name);
  return (
    <div
      className={`${colorClass} ${radius} flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="text-white font-bold leading-none"
        style={{ fontSize: Math.round(size * 0.38) }}
      >
        {initials}
      </span>
    </div>
  );
}
