import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/common/AddItemForm/AddItemForm';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {addTodoListAC, fetchTodoLists} from './reducers/todoListsReducer';

export type FilterValuesType = 'all' | 'active' | 'completed'


export const App = () => {

    const [todoListsRef] = useAutoAnimate<HTMLDivElement>()
    const todoLists = useAppSelector(state => state.todoLists)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])

    const addTodos = useCallback((newTitle: string) => {
        dispatch(addTodoListAC(newTitle))
    }, [dispatch])

    const todoListsComponents = todoLists.map(tl => {
            return (
                <Todolist
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                />
            )
        }
    )

    return (
        <div className="App">
            <div className="headerWrap">
                <AddItemForm addItem={addTodos}/>
            </div>

            <div ref={todoListsRef} className="wrapper">
                {todoListsComponents}
            </div>
        </div>
    )
}
