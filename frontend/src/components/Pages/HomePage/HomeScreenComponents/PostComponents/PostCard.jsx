import React, { useState } from "react";
import { TvMinimalPlay, Image, NotebookPen } from "lucide-react";
import PostModal from "./PostModal";

const PostCard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full flex justify-center px-3">
        <div className="bg-white p-4 border rounded-2xl border-gray-300 w-full max-w-2xl">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-500 rounded-full h-10 w-12 sm:h-12 sm:w-13" />
            <input
              type="text"
              placeholder="Start a post"
              readOnly
              onClick={() => setOpen(true)}
              className="border rounded-full px-4 py-2 sm:px-6 sm:py-3 border-gray-400 w-full cursor-pointer"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer"  onClick={() => setOpen(true)}>
              <TvMinimalPlay size={18} className="text-green-500 sm:w-7 sm:h-7" />
              <span className="text-xs sm:text-base">Video</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer"  onClick={() => setOpen(true)}>
              <Image size={18} className="text-blue-500 sm:w-7 sm:h-7" />
              <span className="text-xs sm:text-base">Photos</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 cursor-pointer"  onClick={() => setOpen(true)}>
              <NotebookPen size={18} className="text-orange-500 sm:w-7 sm:h-7" />
              <span className="text-xs sm:text-base">
                Write article
              </span>
            </div>
          </div>
        </div>
      </div>
      {open && <PostModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default PostCard;
