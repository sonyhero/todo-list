import React from 'react';
import {FilterValuesType, TaskType} from './App'
import {useAutoAnimate} from '@formkit/auto-animate/react';
import s from './Todolist.module.css'
import {AddItemForm} from './components/AddItemForm';

type PropsType = {
    title: string
    todoListId: string
    tasks: TaskType[]
    filter: FilterValuesType

    addTask: (newTitle: string, todoListId: string) => void
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void

    changeTodoListTitle: (newTitle: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListId: string) => void

}

export const Todolist: React.FC<PropsType> = (props) => {

    const [listRef] = useAutoAnimate<HTMLUListElement>()

    const removeTaskHandler = (taskId: string) => props.removeTask(taskId, props.todoListId)


    const changeFilter = (filerValue: FilterValuesType) => props.changeTodoListFilter(filerValue, props.todoListId)


    const onChangeIsDoneHandler = (taskId: string, e: boolean) => props.changeTaskStatus(taskId, e, props.todoListId)

    const addTask = (newTitle: string) => {
        props.addTask(newTitle, props.todoListId)
    }

    return <div>
        <h3>{props.title}</h3>
        <AddItemForm addItem={addTask}/>
        <ul ref={listRef}>
            {
                props.tasks.map(t => {

                    return (
                        <li className={t.isDone ? s.isDone : ''} key={t.id}>
                            <input type="checkbox"
                                   onChange={(e) => onChangeIsDoneHandler(t.id, e.currentTarget.checked)}
                                   checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => removeTaskHandler(t.id)}>x</button>
                        </li>)
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? s.activeFilter : ''} name={'All'}
                    onClick={() => changeFilter('all')}>All
            </button>
            <button className={props.filter === 'active' ? s.activeFilter : ''} name={'Active'}
                    onClick={() => changeFilter('active')}>Active
            </button>
            <button className={props.filter === 'completed' ? s.activeFilter : ''} name={'Completed'}
                    onClick={() => changeFilter('completed')}>Completed
            </button>
        </div>
    </div>
}