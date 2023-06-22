import React, {memo} from 'react';
import {FilterValuesType} from '../../app/App'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import s from './Todolist.module.css'
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {Button} from '../../components/common/Button/Button';
import {EditableSpan} from '../../components/common/EditableSpan';
import {MappedTasks} from './Tasks/MappedTasks';
import {useTodoList} from './hooks/useTodoList';

type TodolistPropsType = {
    title: string
    todoListId: string
    filter: FilterValuesType
}

export const Todolist: React.FC<TodolistPropsType> = memo((props) => {

    const {title, todoListId, filter} = props

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const {
        removeTodos,
        changeTodosTitle,
        setChangeFilterAll,
        setChangeFilterActive,
        setChangeFilterCompleted,
        tasksForTodolist,
        addTaskHandler
    } = useTodoList(title, todoListId, filter)

    return <div className={s.todoWrapper}>
        <h3>
            <EditableSpan title={title} onChange={changeTodosTitle}/>
            <Button name={'x'} callback={removeTodos} xType={'red'} className={false}/>
        </h3>
        <AddItemForm addItem={addTaskHandler}/>
        <ul className={s.tasks} ref={listRef}>
            <MappedTasks tasksForTodolist={tasksForTodolist}
                         todoListId={todoListId}/>
        </ul>
        <div className={s.btwWrap}>
            <Button className={filter === 'all'} name={'All'} callback={setChangeFilterAll}/>
            <Button className={filter === 'active'} name={'Active'} callback={setChangeFilterActive}/>
            <Button className={filter === 'completed'} name={'Completed'} callback={setChangeFilterCompleted}/>
        </div>
    </div>
})

