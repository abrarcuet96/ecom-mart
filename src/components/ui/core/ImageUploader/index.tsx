import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../../input";

interface TImageUploaderProps {
  label?: string;
  className?: string;
  setImageFiles: Dispatch<SetStateAction<File[]>>;
  setImagePreview: Dispatch<SetStateAction<string[]>>;
}
const ImageUploader = ({
  label = "Upload Images",
  className,
  setImageFiles,
  setImagePreview,
}: TImageUploaderProps) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }

    e.target.value = "";
  };

  return (
    <div className={cn("flex flex-col items-center w-full gap-4", className)}>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="image-uploader"
      />
      <label
        htmlFor="image-uploader"
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-white transition"
      >
        {label}
      </label>
    </div>
  );
};

export default ImageUploader;
