import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { Input } from "../../input";

interface TImageUploaderProps {
  imageFiles: File[] | [];
  setImageFiles: Dispatch<SetStateAction<[] | File[]>>;
}
const ImageUploader = ({ imageFiles, setImageFiles }: TImageUploaderProps) => {
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);

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
    <div>
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
        id="image-uploader"
      />
      <label
        className="w-full h-36 md:size-36 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer text-center text-sm text-gray-500 hover:bg-white transition"
        htmlFor="image-uploader"
      >
        Upload Logo
      </label>
      <div>
        {imagePreview?.map((preview, idx) => (
          <Image
            key={idx}
            src={preview}
            width={500}
            height={500}
            alt="images"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
