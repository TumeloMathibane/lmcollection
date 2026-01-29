"use client";

import Image from "next/image";
import { useState } from "react";
import { fallbackImage } from "../../constants/images";

interface ImageWithFallbackProps {
  src?: string;
  alt?: string;
}

export default function ImageWithFallback({
  src,
  alt,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src ?? fallbackImage);

  return (
    <Image
      src={imgSrc ?? fallbackImage}
      alt={alt ?? ""}
      width={500}
      height={500}
      onLoad={(result) =>
        result.currentTarget.naturalHeight === 0 && setImgSrc(fallbackImage)
      }
      onError={() => setImgSrc(fallbackImage)}
      className="h-full w-full object-cover object-center"
    />
  );
}
