import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './components/Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
    changeIsDone: (taskId: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {


    const [newTitle, setNewTitle] = useState('')

    const addTaskHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') addTaskHandler()
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const removeTaskHandler = (t: string) => {
        props.removeTask(t)
    }

    const changeFilter = (filerValue: FilterValuesType) => {
        props.changeFilter(filerValue)
    }

    const onChangeIsDoneHandler = (taskId: string, e: boolean) => {
        props.changeIsDone(taskId, e)
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {


                    return (
                        <li key={t.id}>
                            <input type="checkbox"
                                   onChange={(e)=>onChangeIsDoneHandler(t.id, e.currentTarget.checked)}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => removeTaskHandler(t.id)}>x</button>
                        </li>)
                })
            }
        </ul>
        <div>
            <Button name={'All'} callback={() => changeFilter('all')}/>
            <Button name={'Active'} callback={() => changeFilter('active')}/>
            <Button name={'Completed'} callback={() => changeFilter('completed')}/>
        </div>
    </div>
}