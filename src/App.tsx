import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {addTodoListAC} from './reducers/todoListsReducer';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {useAppDispatch, useAppSelector} from './hooks/hooks';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListsStateType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export const App = () => {

    console.log('App render')

    const [todoListsRef] = useAutoAnimate<HTMLDivElement>()

    const todoLists = useAppSelector(state => state.todoLists)
    const dispatch = useAppDispatch()
    const addTodoList = useCallback((newTitle: string) => {
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
                <AddItemForm addItem={addTodoList}/>
            </div>

            <div ref={todoListsRef} className="wrapper">
                {todoListsComponents}
            </div>
        </div>
    )
}
