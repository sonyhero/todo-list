import React, { memo } from 'react'
import { Task } from './Task'
import { TaskType } from '../../../api/api'

type MappedTasksTyp = {
  tasksForTodolist: TaskType[]
  todolistId: string
}

export const MappedTasks: React.FC<MappedTasksTyp> = memo((props) => {
  const { tasksForTodolist, todolistId } = props

  const task = tasksForTodolist.map((t) => {
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
  return <>{task}</>
})
