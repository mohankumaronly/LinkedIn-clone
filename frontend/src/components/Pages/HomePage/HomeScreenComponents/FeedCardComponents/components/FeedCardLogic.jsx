import { useState } from "react";

export const useFeedCardLogic = ({
    initialLikes,
    initialRepostCount,
    commentsFromDB,
    isEmbedded,
    type,
    userAvatar
}) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(initialLikes || 0);
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState(commentsFromDB || []);
    const [newComment, setNewComment] = useState("");
    const [openShare, setOpenShare] = useState(false);
    const [repostCount, setRepostCount] = useState(initialRepostCount || 0);
    const [showRepostMenu, setShowRepostMenu] = useState(false);
    const [repostedByMe, setRepostedByMe] = useState(false);
    const [openRepostModal, setOpenRepostModal] = useState(false);

    const handleLike = () => {
        if (isEmbedded || type === "REPOST") return;
        setLiked((p) => !p);
        setLikeCount((p) => (liked ? p - 1 : p + 1));
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return;
        setComments((p) => [
            ...p,
            { id: Date.now(), user: "You", avatar: userAvatar, text: newComment },
        ]);
        setNewComment("");
    };

    const handleQuickRepost = () => {
        if (type === "REPOST" || repostedByMe) return;
        setRepostedByMe(true);
        setRepostCount((p) => p + 1);
        setShowRepostMenu(false);
    };

    return {
        state: {
            liked, likeCount, showComments, comments, newComment, openShare,
            repostCount, showRepostMenu, repostedByMe, openRepostModal
        },
        handlers: {
            setLiked, setLikeCount, setShowComments, setComments, setNewComment,
            setOpenShare, setRepostCount, setShowRepostMenu, setRepostedByMe,
            setOpenRepostModal, handleLike, handleAddComment, handleQuickRepost
        }
    };
};