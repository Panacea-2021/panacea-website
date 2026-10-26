import React from "react";

type SectionTitleProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
  /** Extra classes for the gradient text span */
  textClassName?: string;
  align?: "center" | "left";
};

/**
 * Homepage section title — matches “Our Story” gradient style.
 */
export default function SectionTitle({
  children,
  as: Tag = "h2",
  className = "",
  textClassName = "",
  align = "center",
}: SectionTitleProps) {
  return (
    <Tag
      className={`${align === "center" ? "text-center" : "text-left"} text-4xl md:text-5xl font-black tracking-tight uppercase ${className}`}
    >
      <span
        className={`bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#fb7185] bg-clip-text text-transparent ${textClassName}`}
      >
        {children}
      </span>
    </Tag>
  );
}
