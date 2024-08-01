import { useDispatch } from "react-redux";
import { AppDispatch } from "../services/type";

export const useAppDispatch = () => useDispatch<AppDispatch>();