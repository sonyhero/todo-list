import { FC, memo } from 'react'
import { Task } from './Task'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useAppSelector } from '@/common/hooks'
import { selectFilteredTasks } from '../tasks-selectors'
import { FilterValuesType } from '../todoListsReducer'
import s from './MappedTasks.module.scss'

type Props = {
  todolistId: string
  filter: FilterValuesType
}

export const MappedTasks: FC<Props> = memo(({ todolistId, filter }) => {
  const tasks = useAppSelector(selectFilteredTasks(todolistId, filter))
  const [listRef] = useAutoAnimate<HTMLUListElement>()

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
    <ul className={s.tasksContainer} ref={listRef}>
      {task}
    </ul>
  )
})
