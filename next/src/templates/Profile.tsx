import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LeftCircleOutlined } from "@ant-design/icons";
import { ProfileEdit, ProfileLarge } from "../components/organisms";
import useSWR from "swr";
import { useSelectState, useTextState, useToggle } from "../hooks";
import { changeFollowStatus } from "../lib/api/addData";
import { useLoginChecker } from "../hooks/useLoginChecker";
import axios from "axios";
import { editUserInfo } from "../lib/api/editData";
import { useToggleByNum } from "../hooks/useToggleByNum";
import { useAddOrSubOne } from "../hooks/useAddOrSubOne";

const Profile: React.FC = () => {
  // プロフィールデータ取得
  const { data: profleData } = useSWR("/profile");
  // タグデータ取得
  const { data: fetchedTags } = useSWR("/tagsData");

  // カスタムフック使用(タグを初期化)
  const initialTags = new Array<number>();
  useEffect(() => {
    for (const tag of profleData.userInfo.tags) {
      initialTags.push(tag.id);
    }
  }, [profleData.userInfo.tags, initialTags]);

  // プロフィール編集用のステート
  // カスタムフック使用(Text)
  const [userName, setUserName] = useTextState(profleData.userInfo.userName);
  const [email, setEmail] = useTextState(profleData.userInfo.email);
  const [description, setDescription] = useTextState(
    profleData.userInfo.description
  );
  const [engineerType, setEngineerType] = useSelectState(
    profleData.userInfo.engineerType
  );
  const [tagsNum, setTagsNum] = useSelectState(initialTags);

  // タグのid,skill,imageを取得
  let tagsByNum: any = [];
  const [tagsData, setTagsData] = useState<any>();
  useEffect(() => {
    const tagsData = async () => {
      const res = await axios.get("http://localhost:9090/getTag");
      setTagsData(res.data.tags);
    };
    tagsData();
  }, []);
  // 選択した記事タグを配列に格納する処理
  for (let tagNum of tagsNum) {
    const tagsFilterByTagNum = tagsData.filter((tag: any) => tag.id == tagNum);
    tagsByNum.push(tagsFilterByTagNum[0]);
  }

  /**
   * 表示フラグ(真偽値)を管理.
   *
   * @remarks 表示の切り替えやログイン状態チェック
   */
  const checkLoginUserFlag = useLoginChecker(profleData.userInfo.id);
  const [editFlag, setEditFlag] = useToggle(true);

  /**
   * フォローする又はフォローを解除する処理.
   *
   * @remarks APIにフォローを知らせて、ブラウザ側でフォローの状態と数をステートを用いて変更
   * @param data.userInfo.id - フォローされるユーザーID
   * @param followStatus - フォロー状態
   */
  // ±1してフォロワー数を管理
  const [followerCount, setFollowerCount] = useAddOrSubOne(
    profleData.userInfo.followerCount
  );
  // フォローのステータスを真偽値で管理
  const [followStatus, setFollowStatus] = useToggleByNum(
    profleData.userInfo.followStatus
  );
  // フォローする処理
  const usrFollowing = async () => {
    await changeFollowStatus(followStatus, profleData.userInfo.id);
    setFollowerCount(followStatus);
    setFollowStatus();
  };

  //
  /**
   * ユーザー情報編集を行う.
   *
   * @remarks
   * sucess: プロフィール画面へ切り替わる
   * error: アラートメッセージ表示
   * @param articleData.article.id - 記事ID
   * @param userName - ユーザーネーム
   * @param email - メールアドレス
   * @param description - 自己紹介
   * @param engineerType - エンジニアタイプ
   * @param tagsNum - タグIDの配列
   * @throws エラーメッセージを表示して処理終了
   */
  const onSubmitEditUser = async () => {
    //  バリデーションチェック
    const errorMsg = "記事投稿に失敗しました。入力内容を確認してください。";
    if (userName === " " || userName === "　" || userName === null) {
      alert(errorMsg);
      return;
    }
    if (email === " " || email === "　" || email === null) {
      alert(errorMsg);
      return;
    }
    if (description === " " || description === "　" || description === null) {
      alert(errorMsg);
      return;
    }

    try {
      // DBにユーザー情報を保存
      const res = await editUserInfo(
        userName,
        email,
        description,
        engineerType,
        tagsNum
      );

      if (res.data.status === "success") {
        alert("ユーザー情報編集に成功しました。プロフィール画面へ戻ります。");
        setEditFlag();
      }
    } catch (error) {
      alert(errorMsg);
    }
  };

  // プロフィール表示用のデータ
  const userInfo = {
    userName: userName,
    email: email,
    userImage: profleData.userInfo.image,
    articleCount: profleData.userInfo.articleCount,
    engineerType: engineerType,
    tagsNum: tagsNum,
    description: description,
    followCount: profleData.userInfo.followCount,
  };

  // プロフィール編集用のメソッド
  const editFunc = {
    setUserName,
    setEmail,
    setDescription,
    setEngineerType,
    setTagsNum,
    onSubmitEditUser,
  };

  return (
    <div>
      {editFlag ? (
        <div className="flex justify-center">
          <div className="m-10 w-2/5 h-auto">
            <Link href={"/"}>
              <a className="text-gray-400 hover:text-slate-600">
                <LeftCircleOutlined className="ml-4 mb-2 text-4xl" />
              </a>
            </Link>
            <ProfileLarge
              userInfo={userInfo}
              tagsByNum={tagsByNum}
              checkLoginUserFlag={checkLoginUserFlag}
              followStatus={followStatus}
              followerCount={followerCount}
              changeUsrFollow={usrFollowing}
            />
            {checkLoginUserFlag && (
              <div className="flex justify-end">
                <span className="mt-2 mr-2 p-2 text-2xl text-white rounded-lg bg-orange-500 hover:bg-orange-300 hover:text-white drop-shadow-2xl">
                  <button type="button" onClick={setEditFlag}>
                    編集
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ProfileEdit
          userInfo={userInfo}
          editFunc={editFunc}
          changeEditFlag={setEditFlag}
        />
      )}
    </div>
  );
};

export default Profile;
