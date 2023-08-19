import { FC, memo } from 'react'
import s from './Task.module.scss'
import { TaskStatuses } from '@/common/enums'
import { RequestStatusType } from '@/app/app.slice'
import { useActions } from '@/common/hooks'
import { tasksThunks } from '@/features/todolists-list/tasksReducer'
import { EditableSpan } from '@/components'
import { Trash } from '@/assets'
import { Button } from '@/components/ui/button'
import { CheckboxDemo } from '@/components/ui/checkbox'

type Props = {
  taskId: string
  title: string
  status: TaskStatuses
  todolistId: string
  entityTaskStatus: RequestStatusType
}

export const Task: FC<Props> = memo((props) => {
  const { taskId, title, status, todolistId, entityTaskStatus } = props
  const { deleteTask, updateTask } = useActions(tasksThunks)

  const removeTaskHandler = () => deleteTask({ todolistId, taskId })

  const changeTaskStatusHandler = (e: boolean) => {
    const taskStatusValue = e ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({ todolistId, taskId, data: { status: taskStatusValue } })
  }

  const changeTaskTitleHandler = (title: string) => updateTask({ todolistId, taskId, data: { title } })

  // return (
  //   <div className={`${s.taskWrap} ${status ? s.isDone : ''}`}>
  //     <div className={s.container}>
  //       <CheckBox
  //         disabled={entityTaskStatus === 'loading'}
  //         checked={status === TaskStatuses.Completed}
  //         callBack={changeTaskStatusHandler}
  //       />
  //       <EditableSpan disabled={entityTaskStatus === 'loading'} onChange={changeTaskTitleHandler} title={title} />
  //     </div>
  //     <Button
  //       disabled={entityTaskStatus === 'loading'}
  //       name={'x'}
  //       callback={removeTaskHandler}
  //       xType={'delete'}
  //       className={false}
  //     />
  //   </div>
  // )
  return (
    <div className={s.taskWrap}>
      <div className={s.container}>
        <CheckboxDemo
          disabled={entityTaskStatus === 'loading'}
          checked={status === TaskStatuses.Completed}
          onChange={changeTaskStatusHandler}
          variant={'default'}
        />
        <EditableSpan disabled={entityTaskStatus === 'loading'} onChange={changeTaskTitleHandler} title={title} />
      </div>
      <Button variant={'icon'} disabled={entityTaskStatus === 'loading'} onClick={removeTaskHandler}>
        <Trash />
      </Button>
    </div>
  )
})
