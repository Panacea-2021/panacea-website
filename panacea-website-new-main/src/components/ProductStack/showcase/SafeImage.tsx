"use client";

import { useState } from "react";
import Image from "next/image";

export default function SafeImage({
  src,
  alt,
  className = "object-cover object-center",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5"
        aria-hidden
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 768px) 80vw, 420px"
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
