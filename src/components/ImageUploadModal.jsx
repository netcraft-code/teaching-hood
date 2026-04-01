import { useEffect, useRef, useState, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

// Canvas se cropped blob banata hai
function getCroppedImg(image, crop, fileName) {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width * scaleX;
  canvas.height = crop.height * scaleY;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    canvas.width,
    canvas.height,
  );

  return new Promise((resolve) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        blob.name = fileName;
        resolve(blob);
      },
      "image/jpeg",
      0.95,
    );
  });
}

const ImageUploadModal = ({ open, onClose, type, onUpload }) => {
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);

  // Avatar 1:1, Banner 3:1
  const aspect = type === "avatar_url" ? 1 : 3;

  const onSelectFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result?.toString() || "");
    reader.readAsDataURL(file);
  };

  const onImageLoad = useCallback(
    (e) => {
      const { width, height } = e.currentTarget;

      const initialCrop = centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, aspect, width, 450),
        width,
        450,
      );
      setCrop(initialCrop);
    },
    [aspect],
  );

  if (!open) return null;

  const handleUpload = async () => {
    if (!completedCrop || !imgRef.current || !selectedFile) return;

    const croppedBlob = await getCroppedImg(
      imgRef.current,
      completedCrop,
      selectedFile.name,
    );

    onUpload(croppedBlob, type);
    handleClose();
  };

  const handleClose = () => {
    setSelectedFile(null);
    setImgSrc("");
    setCrop(undefined);
    setCompletedCrop(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <h2 className="text-lg font-semibold mb-4 capitalize">
          Update {type === "avatar_url" ? "Profile Picture" : "Banner"}
        </h2>

        {/* Upload Area */}
        {!imgSrc && (
          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-gray-50"
          >
            <p className="text-sm text-gray-500">Click to select image</p>
          </div>
        )}

        {/* Crop Area - Banner ke liye exact dimensions */}
        {imgSrc && (
          <div className="flex justify-center bg-gray-100 rounded-lg p-4">
            <div
              className={`w-full ${
                type === "avatar_url"
                  ? "max-w-xs aspect-square"
                  : "max-w-lg aspect-video" // 3:1 aspect ratio ke liye
              }`}
            >
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
                circularCrop={type === "avatar_url"}
              >
                <img
                  ref={imgRef}
                  src={imgSrc}
                  alt="Crop me"
                  onLoad={onImageLoad}
                  className="w-full h-full object-contain rounded"
                />
              </ReactCrop>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onSelectFile}
        />

        {/* Buttons */}
        <div className="flex justify-between items-center mt-6">
          {imgSrc && (
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-3 py-2 text-sm text-blue-600 hover:underline"
            >
              Change image
            </button>
          )}

          <div className="flex gap-3 ml-auto">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm border rounded-lg"
            >
              Cancel
            </button>

            <button
              disabled={!completedCrop}
              onClick={handleUpload}
              className={`px-4 py-2 text-sm rounded-lg text-white
                ${completedCrop ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}
              `}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;