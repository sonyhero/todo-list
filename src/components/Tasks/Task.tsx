import React, {memo} from 'react';
import s from '../Todolist/Todolist.module.css';
import {EditableSpan} from '../common/EditableSpan';
import {Button} from '../common/Button/Button';
import {deleteTaskTC, updateTaskTC} from '../../reducers/tasksReducer';
import {CheckBox} from '../common/CheckBox';
import {useAppDispatch} from '../../hooks/hooks';
import {TaskStatuses} from '../../api/api';

type TaskPropsType = {
    taskId: string
    title: string
    status: TaskStatuses
    todoListId: string
}

export const Task: React.FC<TaskPropsType> = memo((props) => {

    const dispatch = useAppDispatch()

    const {taskId, title, status, todoListId} = props

    const removeTaskHandler = () => {
        dispatch(deleteTaskTC(todoListId, taskId))
    }
    const changeTaskStatusHandler = (e: boolean) => {
        const taskStatusValue = e
            ? TaskStatuses.Completed
            : TaskStatuses.New
        dispatch(updateTaskTC(todoListId, taskId, {status: taskStatusValue}))
    }
    const changeTaskTitleHandler = (newTitle: string) => {
        dispatch(updateTaskTC(todoListId, taskId, {title: newTitle}))
    }

    return (
        <li className={`${s.taskWrap} ${status ? s.isDone : ''}`}>
            <div>
                <CheckBox checked={status === TaskStatuses.Completed} callBack={changeTaskStatusHandler}/>
                <EditableSpan onChange={changeTaskTitleHandler} title={title}/>
            </div>
            <Button name={'x'}
                    callback={removeTaskHandler}
                    xType={'red'}
                    className={false}/>
        </li>
    )
})