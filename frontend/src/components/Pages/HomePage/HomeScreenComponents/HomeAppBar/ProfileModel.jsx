import React from "react";
import { useNavigate } from "react-router-dom";

const ProfileModel = ({ user, onClose }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    onClose?.();
  };

  return (
    <div
      className="absolute right-0 top-12 w-80 bg-white shadow-lg rounded-lg border border-gray-200 p-4 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Profile header */}
      <div className="flex items-start space-x-3">
        <div className="bg-gray-400 rounded-full h-12 w-12" />
        <div>
          <p className="font-semibold text-sm text-gray-900">
            {user.name}
          </p>
          <p className="text-xs text-gray-500">
            {user.bio}
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => handleNavigate("/profile")}
          className="text-xs font-medium text-[#0A66C2] border border-[#0A66C2] px-3 py-1 rounded-full hover:bg-blue-50"
        >
          View profile
        </button>

        <button
          className="text-xs font-medium text-white bg-[#0A66C2] px-3 py-1 rounded-full hover:bg-blue-700"
        >
          Verify
        </button>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Account */}
      <div className="flex flex-col space-y-1">
        <h2 className="text-sm font-semibold text-gray-900">
          Account
        </h2>

        <button
          onClick={() => handleNavigate("/settings")}
          className="w-full text-left text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100 hover:underline"
        >
          Settings & Privacy
        </button>

        <button
          onClick={() => handleNavigate("/help")}
          className="w-full text-left text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100 hover:underline"
        >
          Help
        </button>

        <button
          onClick={() => handleNavigate("/language")}
          className="w-full text-left text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100 hover:underline"
        >
          Language
        </button>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Manage */}
      <div className="flex flex-col space-y-1">
        <h2 className="text-sm font-semibold text-gray-900">
          Manage
        </h2>

        <button
          onClick={() => handleNavigate("/activity")}
          className="w-full text-left text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100 hover:underline"
        >
          Post & Activity
        </button>

        <button
          onClick={() => handleNavigate("/job-posting")}
          className="w-full text-left text-xs text-gray-600 px-2 py-1 rounded hover:bg-gray-100 hover:underline"
        >
          Job Posting Account
        </button>
      </div>

      <hr className="my-4 border-gray-200" />

      {/* Sign out */}
      <button
        onClick={() => handleNavigate("/logout")}
        className="w-full text-left text-xs text-red-600 px-2 py-1 rounded hover:bg-gray-100 hover:underline"
      >
        Sign out
      </button>
    </div>
  );
};

export default ProfileModel;
