import { FC, memo } from 'react'
import { Task } from './Task'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { TaskStatuses } from '../../../common/enums'
import { useAppSelector } from '../../../common/hooks'
import { selectTasks } from '../tasks-selectors'
import { FilterValuesType } from '../todoListsReducer'

type Props = {
  todolistId: string
  filter: FilterValuesType
}

export const MappedTasks: FC<Props> = memo(({ todolistId, filter }) => {
  const tasks = useAppSelector(selectTasks)[todolistId]
  const [listRef] = useAutoAnimate<HTMLUListElement>()

  const filteredTasks = () => {
    return filter === 'active'
      ? tasks.filter((t) => t.status === TaskStatuses.New)
      : filter === 'completed'
      ? tasks.filter((t) => t.status === TaskStatuses.Completed)
      : tasks
  }

  const task = filteredTasks().map((t) => {
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
  return <ul ref={listRef}>{task}</ul>
})
