import React from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from './components/AddItemForm/AddItemForm';
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
} from './reducers/tasksReducer';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
} from './reducers/todoListsReducer';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {useAppSelector} from './hooks/hooks';
import {useDispatch} from 'react-redux';

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

    const [todoListsRef] = useAutoAnimate<HTMLDivElement>()

    const todoLists = useAppSelector(state => state.todoLists)
    const dispatch = useDispatch()

    // const todoListId_1 = v1()
    // const todoListId_2 = v1()

    // });

    // const [todoLists, dispatchTodoLists] = useReducer(TodoListsReducer,[
    //     {id: todoListId_1, title: 'What to learn', filter: 'all'},
    //     {id: todoListId_2, title: 'What to buy', filter: 'all'}
    // ])
    //
    // const [tasks, dispatchTasks] = useReducer(TasksReducer, {
    //     [todoListId_1]: [
    //         {id: v1(), title: 'HTML&CSS', isDone: true},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'ReactJS', isDone: false},
    //         {id: v1(), title: 'Rest API', isDone: false},
    //         {id: v1(), title: 'GraphQL', isDone: false},
    //     ],
    //     [todoListId_2]: [
    //         {id: v1(), title: 'Bread', isDone: true},
    //         {id: v1(), title: 'Salt', isDone: true},
    //         {id: v1(), title: 'Water', isDone: false},
    //         {id: v1(), title: 'Beer', isDone: false},
    //     ]
    // });
    // CRUD operations for Tasks
    const addTask = (newTitle: string, todoListId: string) => {
        // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
        dispatch(AddTaskAC(newTitle, todoListId))
    }
    const removeTask = (taskId: string, todoListId: string) => {
        // setTasks({...tasks, [todoListId]: tasks[todoListId].filter(tl => tl.id !== taskId)})
        dispatch(RemoveTaskAC(taskId, todoListId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        // setTasks({
        //     ...tasks, [todoListId]: tasks[todoListId].map(tl => tl.id === taskId ? {...tl, title: newTitle} : tl)
        // })
        dispatch(ChangeTaskTitleAC(taskId, newTitle, todoListId))
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        // setTasks({
        //     ...tasks,
        //     [todoListId]: tasks[todoListId].map(tl => tl.id === taskId ? {...tl, isDone: newIsDone} : tl)
        // })
        dispatch(ChangeTaskStatusAC(taskId, newIsDone, todoListId))
    }
    // CRUD operations for TodoLists
    const addTodoList = (newTitle: string) => {
        // const newTodoList: TodoListsStateType = {
        //     id: v1(),
        //     title: newTitle,
        //     filter: 'all'
        // }
        // setTodoLists([...todoLists, newTodoList])
        // setTasks({...tasks, [newTodoList.id]: []})
        // const newTodoList: TodoListsStateType = {
        //     id: v1(),
        //     title: newTitle,
        //     filter: 'all'
        // }
        dispatch(AddTodoListAC(newTitle))

    }
    const removeTodoList = (todoListId: string) => {
        // setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        dispatch(RemoveTodoListAC(todoListId))

    }
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl));
        dispatch(ChangeTodoListTitleAC(newTitle, todoListId))
    }
    const changeTodoListFilter = (filerValue: FilterValuesType, todoListId: string) => {
        // setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filerValue} : tl));
        dispatch(ChangeTodoListFilterAC(filerValue, todoListId))
    }

    // const tasksForTodolist = (taskList: TaskType[], filterValue: FilterValuesType) => {
    //     return (filterValue === 'active')
    //         ? taskList.filter(t => !t.isDone)
    //         : (filterValue === 'completed')
    //             ? taskList.filter(t => t.isDone)
    //             : taskList
    // }

    const todoListsComponents = todoLists.map(tl => {

            // const tasksForRender = tasksForTodolist(tasks[tl.id], tl.filter)

            return (
                <Todolist
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    // tasks={tasksForRender}
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
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            <div ref={todoListsRef} className={'wrapper'}>
                {todoListsComponents}
            </div>
        </div>

    );
}

export default App;
