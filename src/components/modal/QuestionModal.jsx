// components/QuestionModal.js
"use client";
import React, { useState, useRef } from "react";
import Modal from "./Modal";
import { Image as ImageIcon, Type, X as CloseIcon } from "lucide-react";

function QuestionModal({ onClose, onPost }) {
  const [questionType, setQuestionType] = useState("text");
  const [questionText, setQuestionText] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleTabChange = (type) => {
    setQuestionType(type);
    setQuestionText("");
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should not exceed 5MB.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = () => {
    if (questionType === "text") {
      if (!questionText.trim()) {
        alert("Please enter your question.");
        return;
      }
      onPost({ type: "text", content: questionText });
    } else if (questionType === "image") {
      if (!imageFile) {
        alert("Please select an image.");
        return;
      }
      onPost({
        type: "image",
        file: imageFile,
        description: questionText.trim(),
      });
    }
  };

  const isPostButtonDisabled =
    (questionType === "text" && !questionText.trim()) ||
    (questionType === "image" && !imageFile);

  return (
    <Modal onClose={onClose}>
      {/* Custom Scrollbar Styling */}
      <style jsx>{`
        .scroll-area {
          max-height: 400px;
          overflow-y: auto;
        }

        .scroll-area::-webkit-scrollbar {
          width: 6px;
        }

        .scroll-area::-webkit-scrollbar-thumb {
          background-color: rgba(76, 175, 80, 0.4);
          border-radius: 3px;
        }

        .scroll-area::-webkit-scrollbar-thumb:hover {
          background-color: rgba(76, 175, 80, 0.6);
        }

        .scroll-area {
          scrollbar-width: thin;
          scrollbar-color: rgba(76, 175, 80, 0.4) transparent;
        }
      `}</style>

      {/* Header */}
      <div className="px-5 pt-4 pb-2">
        <h2 className="text-xl font-bold text-gray-100">Create New Post</h2>
        <p className="text-xs text-gray-400 mt-1">
          Share your question with the community
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 px-5">
        <button
          onClick={() => handleTabChange("text")}
          className={`relative py-3 px-4 text-sm font-medium transition-colors ${
            questionType === "text"
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          <Type size={16} className="inline mr-2" />
          Text
          {questionType === "text" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4CAF50] rounded-full"></span>
          )}
        </button>
        <button
          onClick={() => handleTabChange("image")}
          className={`relative py-3 px-4 text-sm font-medium transition-colors ${
            questionType === "image"
              ? "text-white"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          <ImageIcon size={16} className="inline mr-2" />
          Image
          {questionType === "image" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4CAF50] rounded-full"></span>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="px-5 py-3 scroll-area">
        {questionType === "text" && (
          <textarea
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="What's your question?..."
            className="w-full min-h-[200px] p-3 bg-[#1e1f22] text-gray-200 border border-gray-700 rounded-lg focus:ring-1 focus:ring-[#4CAF50] focus:border-transparent outline-none resize-none placeholder-gray-500 text-sm transition-all"
          />
        )}

        {questionType === "image" && (
          <div className="flex flex-col space-y-3">
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                className="hidden"
              />
              {imagePreview ? (
                <div className="relative w-full min-h-[200px] h-auto border border-gray-700 rounded-lg flex items-center justify-center p-2 bg-[#1a1918]">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-[250px] max-w-full object-contain rounded"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-gray-900/80 text-white p-1 rounded-full hover:bg-gray-800 backdrop-blur-sm transition-all"
                    aria-label="Remove image"
                  >
                    <CloseIcon size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={triggerFileInput}
                  className="w-full min-h-[200px] p-4 bg-[#1e1f22] text-gray-400 border-2 border-dashed border-gray-700 rounded-lg hover:border-[#4CAF50] flex flex-col items-center justify-center transition-all group"
                >
                  <div className="w-12 h-12 bg-gray-800 group-hover:bg-gray-700 rounded-full flex items-center justify-center mb-3 transition-all">
                    <ImageIcon
                      size={20}
                      className="text-gray-400 group-hover:text-[#4CAF50]"
                    />
                  </div>
                  <span className="text-sm font-medium">Upload an image</span>
                  <span className="text-xs mt-1 text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </span>
                </button>
              )}
            </div>
            <textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Add context or description (optional)..."
              className="w-full p-3 bg-[#1e1f22] text-gray-200 border border-gray-700 rounded-lg focus:ring-1 focus:ring-[#4CAF50] focus:border-transparent outline-none resize-none h-24 placeholder-gray-500 text-sm transition-all"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-gray-700 flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-transparent hover:bg-gray-800 text-gray-300 rounded-lg transition-all text-sm font-medium border border-gray-700"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-[#4CAF50] hover:bg-[#45a049] text-white rounded-lg transition-all text-sm font-medium disabled:opacity-50 disabled:hover:bg-[#4CAF50] disabled:cursor-not-allowed"
          disabled={isPostButtonDisabled}
        >
          Post
        </button>
      </div>
    </Modal>
  );
}

export default QuestionModal;
