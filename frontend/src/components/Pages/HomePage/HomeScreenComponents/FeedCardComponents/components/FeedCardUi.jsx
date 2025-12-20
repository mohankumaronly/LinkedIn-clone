import React from "react";
import { ThumbsUp, MessageSquareMore, Repeat2, Send } from "lucide-react";
import ShareModal from "../ShareModal";
import PostModal from "../PostModal";
import { useFeedCardLogic } from "./FeedCardLogic";
import { calculateStats, formatRepostLabel } from "./FeedCardService";

const FeedCardUi = (props) => {
  const {
    type = "NORMAL",
    isEmbedded = false,
    repostedBy = "Unknown",
    repostText = "",
    originalPost = null,
    userName = "User",
    userBio = "",
    userAvatar = "",
    postText = "",
    postImage = "",
  } = props;

  const { state, handlers } = useFeedCardLogic(props);
  const stats = calculateStats(type, originalPost, state.likeCount, state.comments.length);

  return (
    <div className="bg-white shadow rounded-lg p-3 sm:p-4 mb-4 w-full max-w-2xl mx-auto space-y-3">
      
      {/* 🔁 Repost badge */}
      {type === "REPOST" && (
        <div className="flex items-center text-xs text-gray-500 space-x-1">
          <Repeat2 className="w-4 h-4" />
          <span>{formatRepostLabel(repostedBy)}</span>
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
          <FeedCardUi {...originalPost} type="NORMAL" isEmbedded={true} />
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
          <span className="hover:underline cursor-pointer" onClick={() => handlers.setShowComments(p => !p)}>
            {stats.comments} comments
          </span>
          <span className="hover:underline cursor-pointer">
            {state.repostCount} reposts
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
            active={state.liked}
            onClick={handlers.handleLike}
          />

          {type === "NORMAL" && (
            <ActionButton
              icon={MessageSquareMore}
              label="Comment"
              onClick={() => handlers.setShowComments((p) => !p)}
            />
          )}

          {type === "NORMAL" && (
            <div className="relative">
              <ActionButton
                icon={Repeat2}
                label="Repost"
                active={state.repostedByMe}
                onClick={() => handlers.setShowRepostMenu((p) => !p)}
              />

              {state.showRepostMenu && (
                <div className="absolute bottom-10 left-0 bg-white border shadow rounded-md w-52 z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    onClick={handlers.handleQuickRepost}
                  >
                    Repost
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                    onClick={() => {
                      handlers.setShowRepostMenu(false);
                      handlers.setOpenRepostModal(true);
                    }}
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
            onClick={() => handlers.setOpenShare(true)}
          />
        </div>
      )}

      {/* Comments section */}
      {type === "NORMAL" && state.showComments && (
        <div className="space-y-3">
          {state.comments.map((c) => (
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
              value={state.newComment}
              onChange={(e) => handlers.setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 border rounded-full px-4 py-2 text-xs"
              onKeyDown={(e) => e.key === "Enter" && handlers.handleAddComment()}
            />
          </div>
        </div>
      )}

      {/* Modals */}
      {state.openShare && <ShareModal onClose={() => handlers.setOpenShare(false)} />}
      
      {state.openRepostModal && (
        <PostModal
          isRepost
          originalPost={{ userName, userAvatar, postText, postImage }}
          onClose={() => handlers.setOpenRepostModal(false)}
          onSubmitRepost={() => {
            handlers.setRepostedByMe(true);
            handlers.setRepostCount(state.repostCount + 1);
            handlers.setOpenRepostModal(false);
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

export default FeedCardUi;