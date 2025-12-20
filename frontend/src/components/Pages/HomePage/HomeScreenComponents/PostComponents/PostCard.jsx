import React, { useState } from "react";
import { TvMinimalPlay, Image, NotebookPen } from "lucide-react";
import PostModal from "./PostModal";

const PostCard = () => {
  const [open, setOpen] = useState(false)
  const avatarUrl =
    "https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg";

  return (
    <>
      <div className="w-full flex justify-center px-3 mb-6">
        <div className="bg-white p-4 border border-gray-300 rounded-2xl w-full max-w-2xl">
          <div className="flex items-center space-x-3">
            <img
              src={avatarUrl}
              alt="User avatar"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover shrink-0"
            />
            <input
              type="text"
              placeholder="Start a post"
              readOnly
              onClick={() => setOpen(true)}
              className="
                border border-gray-400 rounded-full
                px-4 py-2 sm:px-6 sm:py-3
                w-full cursor-pointer
                hover:bg-gray-50
                focus:outline-none
              "
            />
          </div>
          <div className="flex items-center justify-between pt-4">
            <ActionButton
              icon={TvMinimalPlay}
              label="Video"
              color="text-green-500"
              onClick={() => setOpen(true)}
            />
            <ActionButton
              icon={Image}
              label="Photo"
              color="text-blue-500"
              onClick={() => setOpen(true)}
            />
            <ActionButton
              icon={NotebookPen}
              label="Write article"
              color="text-orange-500"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>
      {open && <PostModal onClose={() => setOpen(false)} />}
    </>
  );
};

const ActionButton = ({ icon: Icon, label, color, onClick }) => (
  <button
    onClick={onClick}
    className="
      flex items-center space-x-2
      px-2 py-1 rounded-lg
      hover:bg-gray-100
      cursor-pointer
    "
  >
    <Icon className={`${color} w-5 h-5 sm:w-6 sm:h-6`} />
    <span className="text-xs sm:text-sm font-medium text-gray-700">
      {label}
    </span>
  </button>
);
export default PostCard;
