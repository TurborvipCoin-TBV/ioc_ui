import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppThunkDispatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector:TypedUseSelectorHook<RootState> = useSelector;