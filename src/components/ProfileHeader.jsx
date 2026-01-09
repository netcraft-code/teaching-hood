import { useNavigate } from "react-router-dom";
import backIcon from "../assets/icons/back.svg";
import editIcon from "../assets/icons/edit.svg";

const routes = {
  VIEW_PROFILE: "/view-profile",
};

const ProfileHeader = ({ onEdit, id }) => {
  const navigate = useNavigate();

  const handleShare = async () => {
    const profileRoute = `${window.location.origin}${routes.VIEW_PROFILE}${id ? `/${id}` : ""}`;
    await navigator.clipboard.writeText(profileRoute);
    alert("Profile link copied!");
  };

  return (
    <div className="w-full bg-white px-24 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-gray-200 bg-gray-100 rounded-xl"
          >
            <div className="">
              <img
                src={backIcon}
                alt="Back"
                className="h-5 w-auto"
              />
            </div>
          </button>
          <h1 className="text-lg font-semibold">My Profile</h1>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2 border rounded-full hover:bg-gray-50"
          >
            Share Profile
          </button>

          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700"
          >
            <img
              src={editIcon}
              alt="Edit Profile"
              className="h-4 w-auto"
            />

            Edit Profile
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfileHeader;
