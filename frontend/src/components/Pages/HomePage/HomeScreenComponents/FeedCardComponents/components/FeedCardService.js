export const calculateStats = (type, originalPost, likeCount, commentsLength) => {
  if (type === "REPOST" && originalPost) {
    return {
      likes: originalPost.initialLikes ?? 0,
      comments: originalPost.commentsFromDB?.length ?? 0,
    };
  }
  return {
    likes: likeCount,
    comments: commentsLength,
  };
};

export const formatRepostLabel = (repostedBy) => {
  return repostedBy === "You" ? "You reposted this" : `${repostedBy} reposted this`;
};