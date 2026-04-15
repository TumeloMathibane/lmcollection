import Image from "next/image";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { BiStar, BiTrash } from "react-icons/bi";

export default function ImageSelector({
  images,
  onImagesChange,
}: {
  images: File[];
  onImagesChange: (imgs: File[]) => void;
}) {
  const [previews, setPreviews] = useState<
    { id: string; file: File; preview: string }[]
  >([]);
  const imgRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;

    if (files) {
      onImagesChange([...images, ...Array.from(files)]);
    }

    imgRef.current!.value = "";
  };

  const handlePrimaryImageSelect = (img: File) => {
    // console.log("Selected primary image:", img.name);
    const filteredFiles = images.filter((file) => file !== img);
    onImagesChange([img, ...filteredFiles]);
  };

  const removeImg = (img: File) => {
    const filteredFiles = images.filter((file) => file !== img);
    onImagesChange(filteredFiles);
  };

  useEffect(() => {
    const next = images.map((file) => ({
      id: `${file.name}-${file.lastModified}`,
      file,
      preview: URL.createObjectURL(file),
    }));

    setPreviews(next);

    return () => {
      next.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, [images]);

  return (
    <div>
      <input
        type="file"
        multiple
        className="input input-md w-full"
        hidden
        accept=".jpg, .jpeg, .png, .webp, .gif"
        id="img-selector"
        ref={imgRef}
        onChange={handleInputChange}
      />

      <div className="p-2 w-full h-full border border-stone-200 rounded items-center space-y-2 xl:border-0 xl:p-0 xl:py-4">
        <div className="flex gap-3 items-center justify-between">
          <button
            type="button"
            id="images"
            className="btn shadow-none"
            onClick={() => document.getElementById("img-selector")?.click()}>
            Add image/s
          </button>

          {images.length >= 3 && (
            <button
              type="button"
              className="btn btn-sm btn-ghost bg-transparent text-error-content"
              onClick={() => onImagesChange([] as File[])}>
              Clear images
            </button>
          )}
        </div>

        {previews.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {previews.map((preview, index) => (
              <div key={index} className="w-24 h-24 relative">
                <BiTrash
                  size={"1.5rem"}
                  className="absolute top-2 right-2 text-red-700"
                  onClick={() => removeImg(preview.file)}
                />

                <BiStar
                  size={"1.5rem"}
                  className={`absolute top-2 left-2 ${index === 0 ? "text-amber-400" : "text-stone-400"}`}
                  onClick={() => handlePrimaryImageSelect(preview.file)}
                />

                <Image
                  src={preview.preview}
                  alt={preview?.id}
                  className="w-full h-full object-cover rounded"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
