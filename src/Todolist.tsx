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
import {Task} from './Task';

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

    // CRUD operations for Tasks
    // const tasksForTodolist = (taskList: TaskType[], filterValue: FilterValuesType) => {
    //     return (filterValue === 'active')
    //         ? taskList.filter(t => !t.isDone)
    //         : (filterValue === 'completed')
    //             ? taskList.filter(t => t.isDone)
    //             : taskList
    // }
    // const tasksForRender = tasksForTodolist(tasks, filter)

    const tasksForTodolist = () => {
        return (filter === 'active')
            ? tasks.filter(t => !t.isDone)
            : (filter === 'completed')
                ? tasks.filter(t => t.isDone)
                : tasks
    }

    const addTask = useCallback((newTitle: string) => {
        dispatch(AddTaskAC(todoListId, newTitle))
    }, [dispatch, todoListId])
    // const removeTaskHandler = (taskId: string) => {
    //     dispatch(RemoveTaskAC(todoListId, taskId))
    // }
    // const onChangeTaskStatusHandler = (taskId: string, e: boolean) => {
    //     dispatch(ChangeTaskStatusAC(todoListId, taskId, e,))
    // }
    //
    // const changeTaskTitle = (taskId: string, newTitle: string) => {
    //     dispatch(ChangeTaskTitleAC(todoListId, taskId, newTitle))
    // }

    return <div className={s.todoWrapper}>
        <h3>
            <EditableSpan title={title} onChange={changeTodoListTitle}/>
            <Button name={'x'} callback={removeTodoList} xType={'red'} className={false}/>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul className={s.tasks} ref={listRef}>
            {
                tasksForTodolist().map(t => {
                    return (
                        <Task key={t.id} id={t.id} title={t.title} isDone={t.isDone} todoListId={todoListId}/>
                        // <li className={t.isDone ? s.isDone : ''} key={t.id}>
                        //     <input type="checkbox"
                        //            onChange={(e) => onChangeTaskStatusHandler(t.id, e.currentTarget.checked)}
                        //            checked={t.isDone}/>
                        //     <EditableSpan onChange={(newTitle) => changeTaskTitle(t.id, newTitle)} title={t.title}/>
                        //     <Button name={'x'}
                        //             callback={() => removeTaskHandler(t.id)}
                        //             xType={'red'}
                        //             className={false}/>
                        // </li>
                    )
                })
            }
        </ul>
        <div>
            <Button className={filter === 'all'} name={'All'} callback={setChangeFilterAll}/>
            <Button className={filter === 'active'} name={'Active'} callback={setChangeFilterActive}/>
            <Button className={filter === 'completed'} name={'Completed'} callback={setChangeFilterCompleted}/>
        </div>
    </div>
})

