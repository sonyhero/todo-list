import {TaskType} from '../../App';
import React, {memo} from 'react';
import {Task} from './Task';

type MappedTasksTyp = {
    tasksForTodolist: TaskType[]
    todoListId: string
}

export const MappedTasks: React.FC<MappedTasksTyp> = memo((props) => {

    const {tasksForTodolist, todoListId} = props

    const task = tasksForTodolist.map(t => {
        return (
            <Task key={t.id} id={t.id} title={t.title} isDone={t.isDone} todoListId={todoListId}/>
            // <li className={t.isDone ? s.isDone : ''} key={t.id}>
            //     <input type="checkbox"
            //            onChange={(e) => onChangeTaskStatusHandler(t.id, e.currentTarget.checked)}
            //            checked={t.isDone}/>
            //     <EditableSpan onChange={(newTitle) => changeTaskTitle(t.id, newTitle)} title={t.title}/>
            //     <Button name={'x'}
            //             callback={() => removeTaskHandler(t.id)}
            //             xType={'red'}
            //             className={false}/>
            // </li>
        )
    })
    return (
        <>
            {task}
        </>)
})