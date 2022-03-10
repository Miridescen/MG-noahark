/*
 * @Author: jianwen.Wang
 * @Date: 2022-01-05 10:52:47
 * @LastEditTime: 2022-01-21 11:53:25
 * @LastEditors: jiawen.wang
 */
// export { default as useDebounce } from "./Debounce";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "src/store";

export { useWeb3Context, useAddress } from "./web3Context";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { default as useBonds } from "./Bonds";

function debounce(fn: Function, ms: number) {
  let timer: any;
  return function (...args: any) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, ms);
  };
}
export function useDebounce(fn: Function, time: number) {
  return debounce(fn, time);
}
