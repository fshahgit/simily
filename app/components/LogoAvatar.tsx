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

  if (logoUrl && !imgError) {
    return (
      <div
        className={`rounded-xl bg-white flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src={logoUrl}
          alt={`${name} logo`}
          width={size}
          height={size}
          className="object-contain p-1.5"
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
      className={`${colorClass} rounded-xl flex items-center justify-center flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span
        className="text-white font-bold leading-none"
        style={{ fontSize: Math.round(size * 0.36) }}
      >
        {initials}
      </span>
    </div>
  );
}
