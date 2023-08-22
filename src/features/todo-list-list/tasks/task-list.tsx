import { FC, memo } from 'react'
import { Task } from './task'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAppSelector } from '@/common/hooks'
import { selectFilteredTasks } from './tasks-selectors'
import { FilterValuesType } from '../todo-list.slice'
import s from './task-list.module.scss'

type Props = {
  todolistId: string
  filter: FilterValuesType
}

export const MappedTasks: FC<Props> = memo(({ todolistId, filter }) => {
  const tasks = useAppSelector(selectFilteredTasks(todolistId, filter))
  const [listRef] = useAutoAnimate<HTMLDivElement>()

  const task = tasks.map((t) => {
    return (
      <Task
        key={t.id}
        taskId={t.id}
        title={t.title}
        status={t.status}
        todolistId={todolistId}
        entityTaskStatus={t.entityTaskStatus}
      />
    )
  })
  return (
    <div className={s.tasksContainer} ref={listRef}>
      {task}
    </div>
  )
})
