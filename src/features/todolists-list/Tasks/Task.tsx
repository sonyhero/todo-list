import React, { memo } from 'react'
import s from '../Todolist/Todolist.module.css'
import { useAppDispatch } from '../../../common/hooks'
import { TaskStatuses } from '../../../common/enums'
import { RequestStatusType } from '../../../app/app-reducer'
import { tasksThunks } from '../tasksReducer'
import { Button, CheckBox, EditableSpan } from '../../../common/components'

type TaskPropsType = {
  taskId: string
  title: string
  status: TaskStatuses
  todolistId: string
  entityTaskStatus: RequestStatusType
}

export const Task: React.FC<TaskPropsType> = memo((props) => {
  const { taskId, title, status, todolistId, entityTaskStatus } = props

  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(tasksThunks.deleteTask({ todolistId, taskId }))
  }
  const changeTaskStatusHandler = (e: boolean) => {
    const taskStatusValue = e ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(tasksThunks.updateTask({ todolistId, taskId, data: { status: taskStatusValue } }))
  }
  const changeTaskTitleHandler = (title: string) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId, data: { title } }))
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
