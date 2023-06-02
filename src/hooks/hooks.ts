import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootStateType} from '../redux-store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>() // для санок
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector
