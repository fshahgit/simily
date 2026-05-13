"use client";

import { useEffect, useRef, useState } from "react";
import LogoAvatar from "./LogoAvatar";
import { getSuggestions } from "../lib/suggestions";

interface SuggestionsInputProps {
  value: string;
  onChange: (val: string) => void;
  onSelect?: (val: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SuggestionsInput({
  value,
  onChange,
  onSelect,
  placeholder,
  className = "",
  autoFocus = false,
}: SuggestionsInputProps) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestions = getSuggestions(value);
  const showDropdown = open && suggestions.length > 0;

  // Auto-focus support
  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setHighlighted(-1);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    setOpen(true);
    setHighlighted(-1);
  }

  function handleSelect(item: string) {
    onChange(item);
    onSelect?.(item);
    setOpen(false);
    setHighlighted(-1);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setHighlighted(-1);
    }
  }

  return (
    <div ref={containerRef} className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => value.length >= 1 && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />

      {showDropdown && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full min-w-[220px] rounded-xl border border-gray-800 bg-gray-950 shadow-2xl overflow-hidden">
          {suggestions.map((item, i) => (
            <button
              key={item}
              type="button"
              // Use mousedown so it fires before the input's onBlur
              onMouseDown={(e) => { e.preventDefault(); handleSelect(item); }}
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm text-left transition-colors ${
                i === highlighted
                  ? "bg-violet-600/20 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <LogoAvatar name={item} size={22} />
              <span>{item}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
