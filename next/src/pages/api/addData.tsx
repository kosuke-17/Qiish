import axios from "axios";
import { SelectStateType } from "../../hooks/useInputState";
import getCookie from "../../hooks/cookie/handleCookie";
// ログインユーザーのIdを取得
const guestId = getCookie();
const guestIdNum = Number(guestId);

// 会員登録機能
export const registerUser = async (
  userName: string,
  engineerType: string,
  mailAddress: string,
  password: string,
  confirmPassword: string
) => {
  const res = await axios.post("http://localhost:9090/user/register", {
    userName: userName,
    engineerType: engineerType,
    email: mailAddress,
    password: password,
  });

  //コンソールに入力値を出力（確認出来たら削除する）
  console.log("ユーザーネーム" + userName);
  console.log("エンジニアタイプ" + engineerType);
  console.log("メールアドレス" + mailAddress);
  console.log("パスワード" + password);
  console.log("確認用パスワード" + confirmPassword);

  //レスポンスデータを出力（確認出来たら削除する）
  console.log(res.data.status);

  return res.data.status;
};

// 記事追加機能
export const addArticle = async (
  userId: number,
  title: string,
  content: string,
  tags: SelectStateType
) => {
  const res = await axios.post("http://localhost:9090/article/add", {
    userInfoId: userId,
    title: title,
    content: content,
    tags: tags,
  });
  return res;
};

// コメント投稿機能
export const addComment = async (articleId: number, comment: string) => {
  const res = await axios.post("http://localhost:9090/article/comment", {
    articleId: articleId,
    userInfoId: guestIdNum,
    comment: comment,
  });
  return res.data;
};

// いいね機能(likeフラグがtrueになったら+1カウントを返し、falseなら-1カウントを返す)
// cookieにいいねしたidを保存
export const changeLikeStatus = async (
  articleId: number,
  likeCount: number,
  articleLikeFlag: boolean | number
) => {
  if (!articleLikeFlag) {
    // (userInfoIdを取得する)
    await axios.post("http://localhost:9090/article/like", {
      userInfoId: guestId,
      articleId: articleId,
    });
    return likeCount + 1;
  } else {
    await axios.post("http://localhost:9090/article/removeLike", {
      userInfoId: guestId,
      articleId: articleId,
    });
    return likeCount - 1;
  }
};

// ユーザーフォロー機能
export const changeFollowStatus = async (
  usrFollowFlag: boolean | number,
  postedUserId?: number
) => {
  if (!usrFollowFlag) {
    // (userInfoIdを取得する)
    const res = await axios.post("http://localhost:9090/user/follow", {
      userInfoId: guestId,
      followUserId: postedUserId,
    });
    return res;
  } else {
    const res = await axios.post("http://localhost:9090/user/remove", {
      userInfoId: guestId,
      followUserId: postedUserId,
    });
    return res;
  }
};
