import React, { useState, useRef, useEffect } from "react";
import { Image, X, Pencil } from "lucide-react";
import ImageUploadModal from "./ImageUploadModal";

const PostModal = ({ onClose }) => {
  const [postText, setPostText] = useState("");
  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const textareaRef = useRef(null);

  const handleInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  };

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!selectedImage) {
      setImagePreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedImage);
    setImagePreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const avatarUrl = "https://images.pexels.com/photos/3778966/pexels-photo-3778966.jpeg";


  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-2">
        <div
          className={`
            bg-white rounded-lg relative flex flex-col
            w-full max-w-2xl
            ${selectedImage ? "max-h-[85vh]" : "h-[50vh] sm:h-[60vh]"}
          `}
        >
          <div className="p-3 sm:p-4 flex items-start space-x-3">
            <img
              src={avatarUrl}
              alt="User avatar"
              className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
            />

            <div className="flex justify-between w-full">
              <div>
                <h1 className="text-sm sm:text-lg font-semibold">
                  User Name
                </h1>
                <p className="text-xs sm:text-sm text-gray-600">
                  Post to Anyone
                </p>
              </div>

              <X
                size={20}
                onClick={onClose}
                className="cursor-pointer text-gray-600 hover:text-black"
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto px-3 sm:px-4 space-y-3">
            <textarea
              ref={textareaRef}
              placeholder="What do you want to talk about?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              onInput={handleInput}
              className="
                w-full p-2 sm:p-3
                min-h-20
                text-sm sm:text-base
                placeholder:text-gray-500
                border-none outline-none resize-none
                overflow-hidden
              "
            />
            {imagePreview && (
              <div className="relative w-full">
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full max-h-[60vh] object-contain rounded-lg"
                />

                <div className="absolute top-2 right-2 flex space-x-2 bg-white/90 p-1 rounded-full shadow">
                  <Pencil
                    size={16}
                    onClick={() => setOpenImageModal(true)}
                    className="cursor-pointer text-gray-700"
                  />
                  <X
                    size={16}
                    onClick={() => setSelectedImage(null)}
                    className="cursor-pointer text-gray-700"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-auto">
            <div className="px-3 sm:px-4">
              <Image
                size={20}
                onClick={() => setOpenImageModal(true)}
                className="cursor-pointer text-gray-600 hover:text-black"
              />
            </div>

            <div className="h-px bg-gray-200 my-2" />

            <div className="flex justify-end px-3 sm:px-4 pb-3">
              <button
                disabled={!postText.trim() && !selectedImage}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium
                  ${postText.trim() || selectedImage
                    ? "bg-[#0A66C2] text-white hover:bg-[#004182]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      {openImageModal && (
        <ImageUploadModal
          onClose={() => setOpenImageModal(false)}
          onSelectImage={setSelectedImage}
        />
      )}
    </>
  );
};

export default PostModal;
