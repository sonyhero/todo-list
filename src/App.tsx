import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodoListsStateType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListsStateType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Salt', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
        ],
    });

    function removeTask(id: string, todoListId: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    const addTask = (newTitle: string, todoListId: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeIsDone = (taskId: string, newIsDone: boolean, todoListId: string) => {

        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: newIsDone} : el))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter( tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const tasksForTodolist = () => {
        // if (filter === 'active') {
        //     tasksFilterIsDone = tasks.filter(t => !t.isDone);
        // }
        // if (filter === 'completed') {
        //     tasksFilterIsDone = tasks.filter(t => t.isDone);
        // }
        // return tasksFilterIsDone
        return (filter === 'active')
            ? tasks.filter(t => !t.isDone)
            : (filter === 'completed')
                ? tasks.filter(t => t.isDone)
                : tasks
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const todoListsComponents = todoLists.map(tl =>
        <Todolist
            key={tl.id}
            todoListId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist()}
            filter={tl.filter}
            addTask={addTask}
            removeTask={removeTask}
            changeFilter={changeFilter}
            changeIsDone={changeIsDone}
            removeTodoList={removeTodoList}
        />
    )

    return (

        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
