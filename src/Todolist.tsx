import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from './App'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import s from './Todolist.module.css'

type PropsType = {
    title: string
    todoListId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (newTitle: string, todoListId: string) => void
    changeIsDone: (taskId: string, newIsDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
}

export function Todolist(props: PropsType) {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle.trim(), props.todoListId)
            setNewTitle('')
        } else {
            setError('Ошибка')
        }
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') addTaskHandler()
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const removeTaskHandler = (taskId: string) => {
        props.removeTask(taskId, props.todoListId)
    }

    const changeFilter = (filerValue: FilterValuesType) => {
        props.changeFilter(filerValue, props.todoListId)
    }

    const onChangeIsDoneHandler = (taskId: string, e: boolean) => {
        props.changeIsDone(taskId, e, props.todoListId)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? s.error : ''}
            />
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>

        <ul ref={listRef}>
            {
                props.tasks.map(t => {

                    return (
                        <li className={t.isDone ? s.isDone : ''} key={t.id}>
                            <input type="checkbox"
                                   onChange={(e) => onChangeIsDoneHandler(t.id, e.currentTarget.checked)}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => removeTaskHandler(t.id)}>x</button>
                        </li>)
                })
            }
        </ul>
        <div>
            <button className={props.filter=== 'all' ? s.activeFilter : ''} name={'All'} onClick={() => changeFilter('all')}>All</button>
             <button className={props.filter=== 'active' ? s.activeFilter : ''} name={'Active'} onClick={() => changeFilter('active')}>Active</button>
             <button className={props.filter=== 'completed' ? s.activeFilter : ''} name={'Completed'} onClick={() => changeFilter('completed')}>Completed</button>
        </div>
    </div>
}