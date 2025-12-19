import React from "react";
import { X } from "lucide-react";

const ImageUploadModal = ({ onClose, onSelectImage }) => {

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onSelectImage(file);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/40">
            <div className="bg-white p-5 rounded-lg w-[90%] max-w-sm space-y-4">

                <div className="flex justify-between items-center">
                    <h1 className="font-semibold cursor-pointer">Upload Image</h1>
                    <X onClick={onClose} className="cursor-pointer" />
                </div>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                />
            </div>
        </div>
    );
};

export default ImageUploadModal;
