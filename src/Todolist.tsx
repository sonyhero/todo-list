import React, {memo, useCallback} from 'react';
import {FilterValuesType} from './App'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import s from './Todolist.module.css'
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Button} from './components/Button/Button';
import {EditableSpan} from './components/EditableSpan';
import {useAppSelector} from './hooks/hooks';
import {useDispatch} from 'react-redux';
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from './reducers/todoListsReducer';
import {AddTaskAC} from './reducers/tasksReducer';
import {MappedTasks} from './MappedTasks';

type TodolistPropsType = {
    title: string
    todoListId: string
    filter: FilterValuesType
}

export const Todolist: React.FC<TodolistPropsType> = memo((props) => {

    console.log('Todolist render')

    const {title, todoListId, filter} = props

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const tasks = useAppSelector(state => state.tasks[todoListId])
    const dispatch = useDispatch()

    // CRUD operations for TodoLists
    const removeTodoList = useCallback(() => {
        dispatch(RemoveTodoListAC(todoListId))
    }, [dispatch, todoListId])
    const changeTodoListTitle = useCallback((newTitle: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle, todoListId))
    }, [dispatch, todoListId])

    const setChangeFilterAll = useCallback(() => {
        dispatch(ChangeTodoListFilterAC(todoListId, 'all'))
    }, [dispatch, todoListId])
    const setChangeFilterActive = useCallback(() => {
        dispatch(ChangeTodoListFilterAC(todoListId, 'active'))
    }, [dispatch, todoListId])
    const setChangeFilterCompleted = useCallback(() => {
        dispatch(ChangeTodoListFilterAC(todoListId, 'completed'))
    }, [dispatch, todoListId])


    const filteredTasks = () => {
        return (filter === 'active')
            ? tasks.filter(t => !t.isDone)
            : (filter === 'completed')
                ? tasks.filter(t => t.isDone)
                : tasks
    }

    const tasksForTodolist = filteredTasks()

    const addTask = useCallback((newTitle: string) => {
        dispatch(AddTaskAC(todoListId, newTitle))
    }, [dispatch, todoListId])

    return <div className={s.todoWrapper}>
        <h3>
            <EditableSpan title={title} onChange={changeTodoListTitle}/>
            <Button name={'x'} callback={removeTodoList} xType={'red'} className={false}/>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul className={s.tasks} ref={listRef}>
            <MappedTasks tasksForTodolist={tasksForTodolist}
                         todoListId={todoListId}/>
        </ul>
        <div>
            <Button className={filter === 'all'} name={'All'} callback={setChangeFilterAll}/>
            <Button className={filter === 'active'} name={'Active'} callback={setChangeFilterActive}/>
            <Button className={filter === 'completed'} name={'Completed'} callback={setChangeFilterCompleted}/>
        </div>
    </div>
})

