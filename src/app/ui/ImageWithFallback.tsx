"use client";

import Image from "next/image";
import { useState } from "react";

interface IImageWithFallback {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
}: IImageWithFallback) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);

  return (
    <Image
      src={imgSrc ?? ""}
      alt={alt ?? ""}
      width={500}
      height={500}
      onLoad={(result) =>
        result.currentTarget.naturalHeight === 0 && setImgSrc(fallbackSrc)
      }
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
}
