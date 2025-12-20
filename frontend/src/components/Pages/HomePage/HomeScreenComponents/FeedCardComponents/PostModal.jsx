import { useState } from "react";
import { X } from "lucide-react";

const PostModal = ({
  onClose,
  isRepost = false,
  originalPost,
  onSubmitRepost,
}) => {
  const [text, setText] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-2">
      <div className="bg-white rounded-lg w-full max-w-lg p-4 space-y-3">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">
            {isRepost ? "Repost" : "Create post"}
          </h2>
          <X className="cursor-pointer" onClick={onClose} />
        </div>

        {/*``` Original post preview */}
        {isRepost && originalPost && (
          <div className="border rounded-md p-3 bg-gray-50">
            <div className="flex items-center space-x-2 mb-2">
              <img
                src={originalPost.userAvatar}
                className="w-8 h-8 rounded-full"
                alt=""
              />
              <p className="text-sm font-semibold">
                {originalPost.userName}
              </p>
            </div>
            <p className="text-sm text-gray-700 line-clamp-3">
              {originalPost.postText}
            </p>
            {originalPost.postImage && (
              <img
                src={originalPost.postImage}
                className="w-full mt-2 rounded-md max-h-60 object-cover"
                alt=""
              />
            )}
          </div>
        )}

        {/* Textarea */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add your thoughts..."
          className="w-full border rounded-md p-2 text-sm resize-none min-h-[100px]"
        />

        {/* Footer */}
        <div className="flex justify-end">
          <button
            onClick={onSubmitRepost}
            className="bg-[#0A66C2] text-white px-4 py-2 rounded-full text-sm"
          >
            Repost
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
