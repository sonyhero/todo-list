import React, {memo} from 'react';
import s from '../Todolist/Todolist.module.css';
import {EditableSpan} from '../EditableSpan';
import {Button} from '../Button/Button';
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from '../../reducers/tasksReducer';
import {useDispatch} from 'react-redux';
import {CheckBox} from '../CheckBox';

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
        <li className={`${s.taskWrap} ${isDone ? s.isDone : ''}`}>
            <div>
                <CheckBox checked={isDone} callBack={(e) => onChangeTaskStatusHandler(id, e)}/>
                <EditableSpan onChange={(newTitle) => changeTaskTitle(id, newTitle)} title={title}/>
            </div>
            <Button name={'x'}
                    callback={() => removeTaskHandler(id)}
                    xType={'red'}
                    className={false}/>
        </li>
    )
})