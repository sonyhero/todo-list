import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';

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
    // CRUD operations for Tasks
    const addTask = (newTitle: string, todoListId: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(tl => tl.id !== taskId)})
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(tl => tl.id === taskId ? {...tl, title: newTitle} : tl)
        })
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].map(tl => tl.id === taskId ? {...tl, isDone: newIsDone} : tl)
        })
    }
    // CRUD operations for TodoLists
    const addTodoList = (newTitle: string) => {
        const newTodoList: TodoListsStateType = {
            id: v1(),
            title: newTitle,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList.id]: []})
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl));
    }
    const changeTodoListFilter = (filerValue: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filerValue} : tl));
    }

    const tasksForTodolist = (taskList: TaskType[], filterValue: FilterValuesType) => {
        return (filterValue === 'active')
            ? taskList.filter(t => !t.isDone)
            : (filterValue === 'completed')
                ? taskList.filter(t => t.isDone)
                : taskList
    }

    const todoListsComponents = todoLists.map(tl => {

            const tasksForRender = tasksForTodolist(tasks[tl.id], tl.filter)

            return (
                <Todolist
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    tasks={tasksForRender}
                    filter={tl.filter}

                    addTask={addTask}
                    removeTask={removeTask}
                    changeTaskTitle={changeTaskTitle}
                    changeTaskStatus={changeTaskStatus}

                    removeTodoList={removeTodoList}
                    changeTodoListTitle={changeTodoListTitle}
                    changeTodoListFilter={changeTodoListFilter}
                />
            )
        }
    )

    return (
        <div className={'wrapper'}>
            <div className="App">
                <AddItemForm addItem={addTodoList}/>
                {todoListsComponents}
            </div>
        </div>


    );
}

export default App;
