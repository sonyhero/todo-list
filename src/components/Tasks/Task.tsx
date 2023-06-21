import React, {memo} from 'react';
import s from '../Todolist/Todolist.module.css';
import {EditableSpan} from '../common/EditableSpan';
import {Button} from '../common/Button/Button';
import {changeTaskStatus, changeTaskTitle, removeTask} from '../../reducers/tasksReducer';
import {CheckBox} from '../common/CheckBox';
import {useAppDispatch} from '../../hooks/hooks';
import {TaskStatuses} from '../../api/api';

type TaskPropsType = {
    id: string
    title: string
    status: TaskStatuses
    todoListId: string
}

export const Task: React.FC<TaskPropsType> = memo((props)=>{

    const dispatch = useAppDispatch()

    const {id, title, status, todoListId} = props

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
        <li className={`${s.taskWrap} ${status ? s.isDone : ''}`}>
            <div>
                <CheckBox checked={status===2} callBack={(e) => onChangeTaskStatusHandler(id, e)}/>
                <EditableSpan onChange={(newTitle) => changeTaskTitleHandler(id, newTitle)} title={title}/>
            </div>
            <Button name={'x'}
                    callback={() => removeTaskHandler(id)}
                    xType={'red'}
                    className={false}/>
        </li>
    )
})