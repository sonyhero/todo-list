import s from './Header.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {useCallback} from 'react';
import {clearStateAC, createTodoList} from '../../reducers/todoListsReducer';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {Button} from '../common/Button/Button';
import {logoutTC} from '../../features/Login/auth-reducer';

export const Header = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const addTodos = useCallback((title: string) => {
        dispatch(createTodoList(title))
    }, [dispatch])

    const logOutHandler = () => {
        dispatch(logoutTC())
        dispatch(clearStateAC())
    }

    return (
        <div className={s.header}>
            <div className={s.headerWrap}>
                <AddItemForm addItem={addTodos}/>
                {isLoggedIn && <Button callback={logOutHandler} name={'Log out'}/>}
            </div>
        </div>
    )
}