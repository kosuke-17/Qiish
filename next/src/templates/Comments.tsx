import React, { useState } from "react";
import { CommentComp } from "../components/organisms";

const Comments: React.FC = () => {
  const [commentLike, setCommetnLike] = useState(1);
  const [commentLikeFlag, setCommentLikeFlag] = useState(false);
  // 記事データ(API実装できたら再度行う)
  // const { data, error } = useSWR("/profile");
  // useEffect(() => {
  //   console.log("Article" + data);
  // }, [data]);

  const changeCommentLike = () => {
    if (commentLikeFlag) {
      setCommentLikeFlag(!commentLikeFlag);
      setCommetnLike((prevLike) => prevLike - 1);
    } else {
      setCommentLikeFlag(!commentLikeFlag);
      setCommetnLike((prevLike) => prevLike + 1);
    }
  };
  return (
    <CommentComp
      user_info_data={user_info_data}
      commentLike={commentLike}
      commentLikeFlag={commentLikeFlag}
      changeCommentLike={changeCommentLike}
    />
  );
};

export default Comments;

const user_data = {
  user_name: "rakus111111",
  password: "Yamtataro123",
};

const skill_tags = [
  { user_info_id: 1, skill_id: 1, skill_name: "JavaScript" },
  { user_info_id: 1, skill_id: 5, skill_name: "TypeScript" },
  { user_info_id: 1, skill_id: 6, skill_name: "Vue" },
  { user_info_id: 1, skill_id: 3, skill_name: "TailwindCSS" },
];

export const user_info_data = {
  user_info_id: 1,
  first_name: "太郎",
  last_name: "山田",
  user_name: user_data.user_name,
  email: "yama@taro.com",
  engineer_type: "",
  comment: "趣味はサウナです。",
  skill_tags: skill_tags,
  enginner_type: "FR",
};
