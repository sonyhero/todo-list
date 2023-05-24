import React, {memo} from 'react';
import {FilterValuesType} from '../../App'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import s from './Todolist.module.css'
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {Button} from '../Button/Button';
import {EditableSpan} from '../EditableSpan';
import {MappedTasks} from '../Tasks/MappedTasks';
import {useTodoList} from './hooks/useTodoList';

type TodolistPropsType = {
    title: string
    todoListId: string
    filter: FilterValuesType
}

export const Todolist: React.FC<TodolistPropsType> = memo((props) => {

    console.log('Todolist render')

    const {title, todoListId, filter} = props

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const {
        removeTodoList,
        changeTodoListTitle,
        setChangeFilterAll,
        setChangeFilterActive,
        setChangeFilterCompleted,
        tasksForTodolist,
        addTask
    } = useTodoList(title, todoListId, filter)

    return <div className={s.todoWrapper}>
        <h3>
            <EditableSpan title={title} onChange={changeTodoListTitle}/>
            <Button name={'x'} callback={removeTodoList} xType={'red'} className={false}/>
        </h3>
        <AddItemForm addItem={addTask}/>
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

