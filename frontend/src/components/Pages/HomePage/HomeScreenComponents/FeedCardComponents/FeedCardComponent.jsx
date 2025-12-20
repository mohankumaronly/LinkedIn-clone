<<<<<<< HEAD
import React from 'react'
import { ThumbsUp, MessageSquareMore, Repeat2, Send } from 'lucide-react';

const FeedCardComponent = () => {
    return (
        <div>
            <div className='w-170 space-y-3 shadow-2xl p-4 rounded-sm bg-white'>
                <div className='flex space-x-3'>
                    <div className='bg-gray-500 w-14 h-14 rounded-full'>

                    </div>
                    <div>
                        <h1 className='text-lg font-semibold'>User name</h1>
                        <p>user bio Lorem ipsum dolor sit amet,</p>
                    </div>

                </div>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore reiciendis temporibus itaque repellendus explicabo optio velit ab quaerat, laboriosam consectetur deleniti quidem pariatur ea obcaecati sapiente, quod nisi. Accusantium, harum!</p>
                <div>
                    <div className='h-100 w-full bg-gray-400 flex items-center justify-center font-semibold text-2xl'>
                        <h1>image will display here</h1>
                    </div>
                </div>
                <div className='h-px bg-gray-400'>

                </div>
                <div className='flex items-center justify-between py-4'>
                    <div className='flex space-x-1'>
                        < ThumbsUp />
                        <h1>Like</h1>
                    </div>
                    <div className='flex space-x-1'>
                        < MessageSquareMore />
                        <h1>Comment</h1>
                    </div>
                    <div className='flex space-x-1'>
                        < Repeat2 />
                        <h1>Repost</h1>
                    </div>
                    <div className='flex space-x-1'>
                        < Send />
                        <h1>Send</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCardComponent
=======
import { useState } from "react";
import {
  ThumbsUp,
  MessageSquareMore,
  Repeat2,
  Send,
} from "lucide-react";
import ShareModal from "./ShareModal";
import PostModal from "./PostModal";

const FeedCardComponent = ({
  /* 🔹 Post type */
  type = "REPOST", // NORMAL | REPOST
  isEmbedded = false,

  /* 🔁 Repost-only */
  repostedBy,
  repostText,
  originalPost,

  /* 👤 User */
  userName,
  userBio,
  userAvatar,

  /* 📝 Normal post */
  postText,
  postImage,

  initialLikes = 0,
  initialRepostCount = 0,
  commentsFromDB = [],
}) => {
  /* 👍 Likes (ONLY for NORMAL post) */
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);

  /* 💬 Comments (ONLY for NORMAL post) */
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(commentsFromDB);
  const [newComment, setNewComment] = useState("");

  /* ✉️ Share */
  const [openShare, setOpenShare] = useState(false);

  /* 🔁 Repost */
  const [repostCount, setRepostCount] = useState(initialRepostCount);
  const [showRepostMenu, setShowRepostMenu] = useState(false);
  const [repostedByMe, setRepostedByMe] = useState(false);
  const [openRepostModal, setOpenRepostModal] = useState(false);

  /* ---------- Handlers ---------- */

  const handleLike = () => {
    if (isEmbedded || type === "REPOST") return;
    setLiked((p) => !p);
    setLikeCount((p) => (liked ? p - 1 : p + 1));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments((p) => [
      ...p,
      {
        id: Date.now(),
        user: "You",
        avatar: userAvatar,
        text: newComment,
      },
    ]);
    setNewComment("");
  };

  const handleQuickRepost = () => {
    if (type === "REPOST" || repostedByMe) return;
    setRepostedByMe(true);
    setRepostCount((p) => p + 1);
    setShowRepostMenu(false);
  };

  const handleRepostWithThoughts = () => {
    if (type === "REPOST") return;
    setShowRepostMenu(false);
    setOpenRepostModal(true);
  };

  /* ---------- Stats source ---------- */
  const stats = type === "REPOST" && originalPost
    ? {
        likes: originalPost.initialLikes ?? 0,
        comments: originalPost.commentsFromDB?.length ?? 0,
      }
    : {
        likes: likeCount,
        comments: comments.length,
      };

  return (
    <div className="bg-white shadow rounded-lg p-3 sm:p-4 mb-4 w-full max-w-2xl mx-auto space-y-3">

      {/* 🔁 Repost badge */}
      {type === "REPOST" && (
        <div className="flex items-center text-xs text-gray-500 space-x-1">
          <Repeat2 className="w-4 h-4" />
          <span>
            {repostedBy === "You"
              ? "You reposted this"
              : `${repostedBy} reposted this`}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start space-x-3">
        <img
          src={userAvatar}
          alt="avatar"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
        />
        <div>
          <h1 className="text-sm sm:text-base font-semibold">{userName}</h1>
          <p className="text-xs sm:text-sm text-gray-600">{userBio}</p>
        </div>
      </div>

      {/* Repost thoughts */}
      {type === "REPOST" && repostText && (
        <p className="text-sm sm:text-base text-gray-800">{repostText}</p>
      )}

      {/* Normal post text */}
      {type === "NORMAL" && postText && (
        <p className="text-sm sm:text-base text-gray-800">{postText}</p>
      )}

      {/* Image */}
      {type === "NORMAL" && postImage && (
        <img
          src={postImage}
          alt="post"
          className="w-full rounded-md object-cover max-h-[60vh]"
        />
      )}

      {/* 🔁 Embedded original post */}
      {type === "REPOST" && originalPost && (
        <div className="border rounded-md p-2">
          <FeedCardComponent
            {...originalPost}
            type="NORMAL"
            isEmbedded
          />
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <div className="bg-[#0A66C2] rounded-full p-1">
            <ThumbsUp className="w-3 h-3 text-white fill-white" />
          </div>
          <span>{stats.likes}</span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="hover:underline cursor-pointer">
            {stats.comments} comments
          </span>
          <span className="hover:underline cursor-pointer">
            {repostCount} reposts
          </span>
        </div>
      </div>

      <div className="h-px bg-gray-200" />

      {/* Actions */}
      {!isEmbedded && (
        <div className="flex justify-between relative">
          <ActionButton
            icon={ThumbsUp}
            label="Like"
            active={liked}
            onClick={handleLike}
          />

          {type === "NORMAL" && (
            <ActionButton
              icon={MessageSquareMore}
              label="Comment"
              onClick={() => setShowComments(p => !p)}
            />
          )}

          {type === "NORMAL" && (
            <div className="relative">
              <ActionButton
                icon={Repeat2}
                label="Repost"
                active={repostedByMe}
                onClick={() => setShowRepostMenu(p => !p)}
              />

              {showRepostMenu && (
                <div className="absolute bottom-10 left-0 bg-white border shadow rounded-md w-52 z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    onClick={handleQuickRepost}
                  >
                    Repost
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    onClick={handleRepostWithThoughts}
                  >
                    Repost with your thoughts
                  </button>
                </div>
              )}
            </div>
          )}

          <ActionButton
            icon={Send}
            label="Send"
            onClick={() => setOpenShare(true)}
          />
        </div>
      )}

      {/* Comments */}
      {type === "NORMAL" && showComments && (
        <div className="space-y-3">
          {comments.map((c) => (
            <div key={c.id} className="flex space-x-2">
              <img src={c.avatar} alt={c.user} className="w-8 h-8 rounded-full" />
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <p className="text-xs font-semibold">{c.user}</p>
                <p className="text-xs">{c.text}</p>
              </div>
            </div>
          ))}

          <div className="flex space-x-2">
            <img src={userAvatar} alt="you" className="w-8 h-8 rounded-full" />
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-full px-4 py-2 text-xs"
              onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            />
          </div>
        </div>
      )}

      {openShare && <ShareModal onClose={() => setOpenShare(false)} />}

      {openRepostModal && (
        <PostModal
          isRepost
          originalPost={{ userName, userAvatar, postText, postImage }}
          onClose={() => setOpenRepostModal(false)}
          onSubmitRepost={() => {
            setRepostedByMe(true);
            setRepostCount((p) => p + 1);
            setOpenRepostModal(false);
          }}
        />
      )}
    </div>
  );
};

const ActionButton = ({ icon: Icon, label, onClick, active }) => (
  <button
    onClick={onClick}
    className={`flex items-center space-x-1 text-xs sm:text-sm px-2 py-1 rounded-md hover:bg-gray-100
      ${active ? "text-[#0A66C2]" : "text-gray-600"}`}
  >
    <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${active ? "fill-[#0A66C2]" : ""}`} />
    <span>{label}</span>
  </button>
);

export default FeedCardComponent;
>>>>>>> dev
