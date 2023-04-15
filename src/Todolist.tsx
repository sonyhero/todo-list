import React from 'react';
import {FilterValuesType, TaskType} from './App'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import s from './Todolist.module.css'
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {Button} from './components/Button/Button';
import {EditableSpan} from './components/EditableSpan';

type TodolistPropsType = {
    title: string
    todoListId: string
    tasks: TaskType[]
    filter: FilterValuesType

    addTask: (newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void

    changeTodoListTitle: (newTitle: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const [listRef] = useAutoAnimate<HTMLUListElement>()
    const removeTaskHandler = (taskId: string) => props.removeTask(taskId, props.todoListId)

    // const changeFilter = (filerValue: FilterValuesType) => props.changeTodoListFilter(filerValue, props.todoListId)
    const setChangeFilterAll = () => props.changeTodoListFilter('all', props.todoListId)
    const setChangeFilterActive = () => props.changeTodoListFilter('active', props.todoListId)
    const setChangeFilterCompleted = () => props.changeTodoListFilter('completed', props.todoListId)

    const onChangeIsDoneHandler = (taskId: string, e: boolean) => props.changeTaskStatus(taskId, e, props.todoListId)

    const addTask = (newTitle: string) => {
        props.addTask(newTitle, props.todoListId)
    }

    const removeTodoList = () => {
      props.removeTodoList(props.todoListId)
    }
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.todoListId)
    }

    return <div  className={s.todoWrapper}>
        <h3>
            <EditableSpan title={props.title} onChange={changeTodoListTitle}/>
            <Button name={'x'} callback={removeTodoList}  xType={'red'} className={false}/>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul className={s.tasks} ref={listRef}>
            {
                props.tasks.map(t => {
                    const changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.todoListId)
                    }

                    return (
                        <li className={t.isDone ? s.isDone : ''} key={t.id}>
                            <input type="checkbox"
                                   onChange={(e) => onChangeIsDoneHandler(t.id, e.currentTarget.checked)}
                                   checked={t.isDone}/>
                            <EditableSpan onChange={changeTaskTitle} title={t.title}/>
                            <Button name={'x'}
                                    callback={() => removeTaskHandler(t.id)}
                                    xType={'red'}
                                    className={false}/>
                        </li>)
                })
            }
        </ul>
        <div>
            <Button className={props.filter === 'all'} name={'All'} callback={setChangeFilterAll}/>
            <Button className={props.filter === 'active'} name={'Active'} callback={setChangeFilterActive}/>
            <Button className={props.filter === 'completed'} name={'Completed'} callback={setChangeFilterCompleted}/>
        </div>
    </div>
}