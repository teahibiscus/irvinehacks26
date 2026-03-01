import {
  forwardRef,
  use,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

const ImageUpload = forwardRef(({ onImageSelect }, ref) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      // Optional: Create a preview URL if you want to show it in the UI
      const preview = URL.createObjectURL(file);

      onImageSelect(preview);
    }
  };
  useImperativeHandle(ref, () => ({
    getFile: () => selectedImage,
  }));

  return (
    <div className="mt-4 p-4 border-2 border-dashed border-gray-200 rounded-xl">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        id="image-upload"
        className="hidden"
      />
      <label htmlFor="image-upload" className="cursor-pointer text-[#77777B]">
        <img src="/file.svg" alt="Upload Icon" className="w-6 h-6 mb-2" />
      </label>
    </div>
  );
});

ImageUpload.displayName = "ImageUpload";
export default ImageUpload;
