import React, {memo} from 'react';
import s from '../Todolist/Todolist.module.css';
import {EditableSpan} from '../EditableSpan';
import {Button} from '../Button/Button';
import {changeTaskStatus, changeTaskTitle, removeTask} from '../../reducers/tasksReducer';
import {CheckBox} from '../CheckBox';
import {useAppDispatch} from '../../hooks/hooks';

type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
    todoListId: string
}

export const Task: React.FC<TaskPropsType> = memo((props)=>{

    const dispatch = useAppDispatch()

    const {id, title, isDone, todoListId} = props

    const removeTaskHandler = (taskId: string) => {
        dispatch(removeTask(todoListId, taskId))
    }
    const onChangeTaskStatusHandler = (taskId: string, e: boolean) => {
        dispatch(changeTaskStatus(todoListId, taskId, e,))
    }
    const changeTaskTitleHandler = (taskId: string, newTitle: string) => {
        dispatch(changeTaskTitle(todoListId, taskId, newTitle))
    }

    return (
        <li className={`${s.taskWrap} ${isDone ? s.isDone : ''}`}>
            <div>
                <CheckBox checked={isDone} callBack={(e) => onChangeTaskStatusHandler(id, e)}/>
                <EditableSpan onChange={(newTitle) => changeTaskTitleHandler(id, newTitle)} title={title}/>
            </div>
            <Button name={'x'}
                    callback={() => removeTaskHandler(id)}
                    xType={'red'}
                    className={false}/>
        </li>
    )
})