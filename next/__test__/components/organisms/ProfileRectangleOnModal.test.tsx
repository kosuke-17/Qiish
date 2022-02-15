import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ProfileRectangleOnModal } from "../../../src/components/organisms";
import { ProfileRectangleType } from "../../../src/const/Types";
import { ProfileRectangleMock } from "../../.mock/data";

describe("長方形のプロフィール(モーダル用)をテスト", () => {
  // ダミーのpropsを定義
  const mockCallback = jest.fn();
  let dummyProps: ProfileRectangleType = {
    ...ProfileRectangleMock,
    changeUsrFollow: mockCallback,
  };

  it("ユーザー情報が表示されていること", () => {
    //   render(<ProfileRectangleOnModal {...dummyProps} />);
    //   expect(
    //     screen.getByText("@" + dummyProps.user_data.userName)
    //   ).toBeInTheDocument();
    //   expect(
    //     screen.getByText(dummyProps.user_data.engineerType)
    //   ).toBeInTheDocument();
    //   expect(dummyProps.followStatus).toBeFalsy();
    //   // ボタンをクリックしてbool切り替えしたい(未着手)
    //   // fireEvent.click(screen.getByText("フォロー"));
    //   // screen.debug();
    //   // expect(dummyProps.followStatus).toBeTruthy();
    // });
    // it("フォローボタンが表示されること", () => {
    //   render(<ProfileRectangleOnModal {...dummyProps} />);
    //   expect(screen.getByRole("button").textContent).toBe("フォロー");
  });
});
