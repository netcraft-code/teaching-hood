import { useEffect, useRef, useState } from "react";

const ImageUploadModal = ({ open, onClose, type, onUpload }) => {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!selectedFile) return;

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-md p-6">
        {/* Header */}
        <h2 className="text-lg font-semibold mb-4 capitalize">
          Update {type}
        </h2>

        {/* Upload Area */}
        <div
          onClick={() => fileInputRef.current.click()}
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
        >
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className={`mx-auto ${
                type === "avatar_url"
                  ? "w-32 h-32 rounded-full object-cover"
                  : "w-full h-32 rounded-lg object-cover"
              }`}
            />
          ) : (
            <p className="text-sm text-gray-500">
              Click to select image
            </p>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setSelectedFile(e.target.files[0])}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => {
              setSelectedFile(null);
              setPreview(null);
              onClose();
            }}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>

          <button
            disabled={!selectedFile}
            onClick={() => {
              onUpload(selectedFile, type);
              setSelectedFile(null);
              setPreview(null);
              onClose();
            }}
            className={`px-4 py-2 text-sm rounded-lg text-white
              ${selectedFile ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"}
            `}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
