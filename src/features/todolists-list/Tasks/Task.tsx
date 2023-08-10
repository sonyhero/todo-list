import { FC, memo } from 'react'
import s from '../Todolist/Todolist.module.css'
import { TaskStatuses } from '../../../common/enums'
import { RequestStatusType } from '../../../app/app-reducer'
import { tasksThunks } from '../tasksReducer'
import { Button, CheckBox, EditableSpan } from '../../../common/components'
import { useActions } from '../../../common/hooks'

type TaskPropsType = {
  taskId: string
  title: string
  status: TaskStatuses
  todolistId: string
  entityTaskStatus: RequestStatusType
}

export const Task: FC<TaskPropsType> = memo((props) => {
  const { taskId, title, status, todolistId, entityTaskStatus } = props
  const { deleteTask, updateTask } = useActions(tasksThunks)

  const removeTaskHandler = () => deleteTask({ todolistId, taskId })

  const changeTaskStatusHandler = (e: boolean) => {
    const taskStatusValue = e ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({ todolistId, taskId, data: { status: taskStatusValue } })
  }

  const changeTaskTitleHandler = (title: string) => updateTask({ todolistId, taskId, data: { title } })

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
