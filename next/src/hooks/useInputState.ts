import { SetStateAction, useCallback, useState } from "react";
import { SelectStateType, TextEventType } from "../const/Types";

// ステートのカスタムフック(インプット、テキストエリア)
export const useTextState = (
  initialState: string
): [string, (e: TextEventType) => void] => {
  const [inputState, setInputState] = useState(initialState);

  // useCallbackを用いて余分なレンダリングをなくす
  // why?・・・より高い再利用性のためにはuseCallbackが必要
  // インプットタグの入力値をセット
  const changeState = useCallback((e: TextEventType) => {
    setInputState(e.target.value);
  }, []);
  return [inputState, changeState];
};

export const useSelectState = (
  initialState: SelectStateType
): [SelectStateType, (value: SetStateAction<SelectStateType>) => void] => {
  const [selectState, setSelectState] = useState(initialState);

  // セレクトボックスで選択した値をセット
  const changeState = useCallback((value: SetStateAction<SelectStateType>) => {
    setSelectState(value);
  }, []);
  return [selectState, changeState];
};
