import React from 'react';

type PropsTypeTodo = {
    title: string
    body?: number
    tasks: TaskType[]
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const Todo = (props: PropsTypeTodo) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <h3>{props.body}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (
                        <li>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}

                {/*<li><input type="checkbox" checked={true}/> <span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={true}/> <span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={false}/> <span>{props.tasks[2].title}</span></li>
                <li><input type="checkbox" checked={false}/> <span>{props.tasks[3].title}</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

export default Todo