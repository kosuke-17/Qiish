import React, { useState } from "react";
import { CommentComp, LikeUserModal } from "../components/organisms";
import { CommentData } from "../const/Types";
import { useToggle } from "../hooks";
import { useAddOrSubOne } from "../hooks/useAddOrSubOne";
import { useToggleByNum } from "../hooks/useToggleByNum";
import { addLikeToComment } from "../lib/api/addData";
import { removeLikeToComment } from "../lib/api/removeData";

const Comment: React.FC<CommentData> = ({ commentData }) => {
  /**
   * いいねしたユーザーをステートで管理して、データを動的に変更する.
   *
   * @remarks addLikeToCommentメソッドのレスポンスを受け取り、liksUserListを更新する
   */
  const [liksUserList, setLiksUserList] = useState(
    commentData.commentLikesUserList
  );
  // いいねユーザーモーダル表示を真偽値で管理
  const [likeUserModalStatus, setLikeUserModalStatus] = useToggle(false);

  /**
   * いいねする又はいいねを解除する処理.
   *
   * @remarks APIにいいねを知らせて、ブラウザ側でいいねの状態と数をステートを用いて変更
   * @param コメントID
   *
   */
  // ±1していいね数を管理
  const [likesCount, setLikeCount] = useAddOrSubOne(commentData.likesCount);
  // いいね状態を真偽値で管理
  const [likeStatus, setLikeStatus] = useToggleByNum(commentData.likeStatus);
  // いいねする処理(いいね中: likeStatus === true, いいねしていない: likeStatus === false)
  // いいねしたユーザー情報を取得し、動的に変更
  const changeCommentLike = async () => {
    if (!likeStatus) {
      const res = await addLikeToComment(commentData.id);
      setLiksUserList(res);
    } else {
      const res = await removeLikeToComment(commentData.id);
      setLiksUserList(res);
    }
    setLikeCount(likeStatus);
    setLikeStatus();
  };

  return (
    <div>
      <LikeUserModal
        lieksUserList={liksUserList}
        likeUserModalStatus={likeUserModalStatus}
        setLikeUserModalStatus={setLikeUserModalStatus}
      />
      <CommentComp
        commentData={commentData}
        likesCount={likesCount}
        likeStatus={likeStatus}
        changeCommentLike={changeCommentLike}
        setLikeUserModalStatus={setLikeUserModalStatus}
      />
    </div>
  );
};

export default Comment;
