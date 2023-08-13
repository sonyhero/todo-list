import { AppRootStateType } from '../../app/store'
import { createSelector } from '@reduxjs/toolkit'
import { FilterValuesType } from './todoListsReducer'
import { TaskStatuses } from '../../common/enums'

const selectTasksByTodolistId = (todolistId: string) => {
 return (state: AppRootStateType) => state.tasks[todolistId]
}
export const selectFilteredTasks = (todolistId: string, filter: FilterValuesType) => {
return createSelector(selectTasksByTodolistId(todolistId), tasks => {
 return filter === 'active'
   ? tasks.filter((t) => t.status === TaskStatuses.New)
   : filter === 'completed'
     ? tasks.filter((t) => t.status === TaskStatuses.Completed)
     : tasks
})
}
