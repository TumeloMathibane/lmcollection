"use client";

import Image from "next/image";
import { useState } from "react";

interface IImageWithFallback {
  src?: string;
  alt?: string;
}

export default function ImageWithFallback({ src, alt }: IImageWithFallback) {
  const fallbackSrc =
    "https://placehold.jp/ffffff/595959/400x500.png?text=No%20Image&css=%7B%22border-radius%22%3A%2215px%22%2C%22background%22%3A%22%20-webkit-gradient(linear%2C%20left%20top%2C%20left%20bottom%2C%20from(%23666666)%2C%20to(%23cccccc))%22%7D";
  const [imgSrc, setImgSrc] = useState<string | undefined>(src ?? fallbackSrc);

  return (
    <Image
      src={imgSrc ?? fallbackSrc}
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
