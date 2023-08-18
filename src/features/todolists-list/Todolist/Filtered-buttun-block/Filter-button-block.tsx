import { FC, memo } from 'react'
import { useActions } from '@/common/hooks'
import s from './Filter-button-block.module.scss'
import { FilterValuesType, todolistActions } from '@/features/todolists-list/todoListsReducer'
import { Button } from '@/components'

type Props = {
  todolistId: string
  filter: FilterValuesType
}

export const FilterButtonBlock: FC<Props> = memo(({ filter, todolistId }) => {
  const { changeTodoListFilter } = useActions(todolistActions)

  const changeFilter = (filterValue: FilterValuesType) => () => {
    changeTodoListFilter({ todolistId, filter: filterValue })
  }

  const data: { name: string; filterValue: FilterValuesType }[] = [
    { name: 'All', filterValue: 'all' },
    { name: 'Active', filterValue: 'active' },
    { name: 'Completed', filterValue: 'completed' },
  ]

  const mappedButton = data.map(({ name, filterValue }) => (
    <Button key={name} name={name} className={filter === filterValue} callback={changeFilter(filterValue)} />
  ))

  return <div className={s.btwWrap}>{mappedButton}</div>
})
