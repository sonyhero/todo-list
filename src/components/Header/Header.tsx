import s from './Header.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {useCallback} from 'react';
import {createTodoList} from '../../reducers/todoListsReducer';
import {useAppDispatch} from '../../hooks/hooks';

export const Header = () => {

    const dispatch = useAppDispatch()

    const addTodos = useCallback((title: string) => {
        dispatch(createTodoList(title))
    }, [dispatch])

    return (
        <div className={s.header}>
            <div className={s.headerWrap}>
                <AddItemForm addItem={addTodos}/>
            </div>
            </div>
    )
}