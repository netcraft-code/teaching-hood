const EditProfileModal = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl p-6">

        <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
          />

          <textarea
            placeholder="About Us"
            rows="4"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfileModal;
