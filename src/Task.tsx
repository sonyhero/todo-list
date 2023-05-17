import React, {memo} from 'react';
import s from './Todolist.module.css';
import {EditableSpan} from './components/EditableSpan';
import {Button} from './components/Button/Button';
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './reducers/tasksReducer';
import {useDispatch} from 'react-redux';

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    todoListId: string
}

export const Task: React.FC<TaskPropsType> = memo((props)=>{

    const dispatch = useDispatch()

    const {id, title, isDone, todoListId} = props

    const removeTaskHandler = (taskId: string) => {
        dispatch(RemoveTaskAC(todoListId, taskId))
    }
    const onChangeTaskStatusHandler = (taskId: string, e: boolean) => {
        dispatch(ChangeTaskStatusAC(todoListId, taskId, e,))
    }

    const changeTaskTitle = (taskId: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todoListId, taskId, newTitle))
    }

    return (
        <li className={isDone ? s.isDone : ''}>
            <input type="checkbox"
                   onChange={(e) => onChangeTaskStatusHandler(id, e.currentTarget.checked)}
                   checked={isDone}/>
            <EditableSpan onChange={(newTitle) => changeTaskTitle(id, newTitle)} title={title}/>
            <Button name={'x'}
                    callback={() => removeTaskHandler(id)}
                    xType={'red'}
                    className={false}/>
        </li>
    )
})