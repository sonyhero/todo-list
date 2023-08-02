import React, { memo } from 'react'
import s from '../Todolist/Todolist.module.css'
import { EditableSpan } from '../../../components/common/EditableSpan'
import { Button } from '../../../components/common/Button/Button'
import { deleteTaskTC, updateTaskTC } from '../tasksReducer'
import { CheckBox } from '../../../components/common/CheckBox/CheckBox'
import { useAppDispatch } from '../../../hooks/hooks'
import { TaskStatuses } from '../../../api/api'
import { RequestStatusType } from '../../../app/app-reducer'

type TaskPropsType = {
  taskId: string
  title: string
  status: TaskStatuses
  todoListId: string
  entityTaskStatus: RequestStatusType
}

export const Task: React.FC<TaskPropsType> = memo((props) => {
  const { taskId, title, status, todoListId, entityTaskStatus } = props

  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(deleteTaskTC(todoListId, taskId))
  }
  const changeTaskStatusHandler = (e: boolean) => {
    const taskStatusValue = e ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTaskTC(todoListId, taskId, { status: taskStatusValue }))
  }
  const changeTaskTitleHandler = (newTitle: string) => {
    dispatch(updateTaskTC(todoListId, taskId, { title: newTitle }))
  }

  return (
    <li className={`${s.taskWrap} ${status ? s.isDone : ''}`}>
      <div className={s.container}>
        <CheckBox
          disabled={entityTaskStatus === 'loading'}
          checked={status === TaskStatuses.Completed}
          callBack={changeTaskStatusHandler}
        />
        <EditableSpan disabled={entityTaskStatus === 'loading'} onChange={changeTaskTitleHandler} title={title} />
      </div>
      <Button
        disabled={entityTaskStatus === 'loading'}
        name={'x'}
        callback={removeTaskHandler}
        xType={'delete'}
        className={false}
      />
    </li>
  )
})
