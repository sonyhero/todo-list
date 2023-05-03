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

    // CRUD operations for Tasks
    const addTask = (newTitle: string, todoListId: string) => {
        dispatch(AddTaskAC(newTitle, todoListId))
    }
    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(RemoveTaskAC(taskId, todoListId))
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {

        dispatch(ChangeTaskTitleAC(taskId, newTitle, todoListId))
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatch(ChangeTaskStatusAC(taskId, newIsDone, todoListId))
    }
    // CRUD operations for TodoLists
    const addTodoList = (newTitle: string) => {
        dispatch(AddTodoListAC(newTitle))
    }
    const removeTodoList = (todoListId: string) => {
        dispatch(RemoveTodoListAC(todoListId))
    }
    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle, todoListId))
    }
    const changeTodoListFilter = (filerValue: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodoListFilterAC(filerValue, todoListId))
    }

    const todoListsComponents = todoLists.map(tl => {

            return (
                <Todolist
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
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
