import React, { useEffect, useRef, useState } from "react";

interface ImageUploaderProps {
  value?: File | null;
  onFileChange?: (file: File | null) => void;
}

function ImageUpload({ value, onFileChange }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(value);
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setPreview(null);
      return;
    }
    onFileChange?.(file);
  };

  const clearFile = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileChange?.(null);
  };

  return (
    <div className="border border-gray-400 px-3 py-3 rounded cursor-pointer">
      {!preview && (
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          placeholder="Upload Event banner/flyer(max 2MB)"
          className="block w-full text-sm text-gray-700 cursor-pointer file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
        />
      )}

      {preview && (
        <div className="mt-2 flex flex-row items-center gap-12 p-3">
          <div className="flex flex-col gap-2">
            <img
              src={preview}
              alt="Event banner"
              className="h-20 w-20 rounded object-cover"
            />
            <p className="text-sm text-gray-600">
              {fileInputRef.current?.files?.[0]?.name}
            </p>
          </div>
          <button
            type="button"
            onClick={clearFile}
            className="flex bg-gray-400 font-normal hover:bg-gray-700 hover:text-white text-white px-3 py-1 text-center cursor-pointer rounded-2xl"
          >
            <p className="text-center items-center">cancel</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageUpload;
