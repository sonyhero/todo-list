import React, {useState} from 'react';
import {FilterType} from '../App';

type PropsTypeTodo = {
    title: string
    removeTask: (id: number) => void
     tasks: TaskType[]

    // filterTask: (buttonName: FilterType)=> void
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: PropsTypeTodo) => {



    let [filter, setFilter] = useState<FilterType>('All')

    let filteredTask = props.tasks
    if (filter === 'Active') {
        filteredTask = props.tasks.filter(el => !el.isDone)
    }
    if (filter === 'Completed') {
        filteredTask = props.tasks.filter(el => el.isDone)
    }
    const filterTask = (buttonName: FilterType) => {
        setFilter(buttonName)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {filteredTask.map((el) => {
                    return (
                        <li>
                            <button onClick={() => props.removeTask(el.id)}>x</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {
                    filterTask('All')
                }}>All
                </button>
                <button onClick={() => {
                    filterTask('Active')
                }}>Active
                </button>
                <button onClick={() => {
                    filterTask('Completed')
                }}>Completed
                </button>
            </div>
        </div>
    )
}