import {addTodoList, removeTodoList, setTodolist} from './todoListsReducer';
import {v1} from 'uuid';

const initialState: InitialStateType = {
    ['todoListId_1']: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ],
    ['todoListId_2']: [
        {id: v1(), title: 'Bread', isDone: true},
        {id: v1(), title: 'Salt', isDone: true},
        {id: v1(), title: 'Water', isDone: false},
        {id: v1(), title: 'Beer', isDone: false},
    ]
}

export const TasksReducer = (state: InitialStateType = initialState, action: TasksReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'TASKS/ADD_TASK': {
            return {
                ...state,
                [action.payload.todoListId]: [{
                    id: v1(),
                    title: action.payload.newTitle,
                    isDone: false
                }, ...state[action.payload.todoListId]]
            }
        }
        case 'TASKS/REMOVE_TASK': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].filter(el => el.id !== action.payload.taskId)
            }
        }
        case
        'TASKS/CHANGE_TASK_TITLE': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, title: action.payload.newTitle}
                    : el
                )
            }
        }
        case 'TASKS/CHANGE_TASK_STATUS': {
            return {
                ...state,
                [action.payload.todoListId]: state[action.payload.todoListId].map(el => el.id === action.payload.taskId
                    ? {...el, isDone: action.payload.newIsDone}
                    : el
                )
            }
        }
        case 'TODOLIST/ADD_TODOLIST': {
            return {
                ...state, [action.payload.todoListId]: []
            }
        }
        case 'TODOLIST/REMOVE_TODOLIST': {
            let stateCopy = {...state}
            delete stateCopy[action.payload.todoListId]
            return stateCopy
        }
        case 'TODOLIST/SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
    }
    return state
}

// actions
export const addTask = (todoListId: string, newTitle: string) => {
    return {
        type: 'TASKS/ADD_TASK',
        payload: {
            todoListId,
            newTitle
        }
    } as const
}
export const removeTask = (todoListId: string, taskId: string) => {
    return {
        type: 'TASKS/REMOVE_TASK',
        payload: {
            todoListId,
            taskId
        }
    } as const
}
export const changeTaskStatus = (todoListId: string, taskId: string, newIsDone: boolean) => {
    return {
        type: 'TASKS/CHANGE_TASK_STATUS',
        payload: {
            todoListId,
            taskId,
            newIsDone
        }
    } as const
}
export const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string,) => {
    return {
        type: 'TASKS/CHANGE_TASK_TITLE',
        payload: {
            todoListId,
            taskId,
            newTitle
        }
    } as const
}

//types
type TasksReducerActionType =
    ReturnType<typeof addTask>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof changeTaskStatus>
    | ReturnType<typeof changeTaskTitle>
    | ReturnType<typeof addTodoList>
    | ReturnType<typeof removeTodoList>
    | ReturnType<typeof setTodolist>

export type InitialStateType = {
    [key: string]: InitialTaskType[]
}

type InitialTaskType = {
    id: string
    title: string
    isDone: boolean
}