import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {useCallback} from 'react';
import {changeTodoListFilter, changeTodoListTitle, removeTodoList} from '../../../reducers/todoListsReducer';
import {addTask} from '../../../reducers/tasksReducer';
import {FilterValuesType} from '../../../App';

export const useTodoList = (title: string, todoListId: string, filter: FilterValuesType) => {

    const tasks = useAppSelector(state => state.tasks[todoListId])
    const dispatch = useAppDispatch()

    // CRUD operations for TodoLists
    const removeTodos = useCallback(() => {
        dispatch(removeTodoList(todoListId))
    }, [dispatch, todoListId])
    const changeTodosTitle = useCallback((newTitle: string) => {
        dispatch(changeTodoListTitle(newTitle, todoListId))
    }, [dispatch, todoListId])

    const setChangeFilterAll = useCallback(() => {
        dispatch(changeTodoListFilter(todoListId, 'all'))
    }, [dispatch, todoListId])
    const setChangeFilterActive = useCallback(() => {
        dispatch(changeTodoListFilter(todoListId, 'active'))
    }, [dispatch, todoListId])
    const setChangeFilterCompleted = useCallback(() => {
        dispatch(changeTodoListFilter(todoListId, 'completed'))
    }, [dispatch, todoListId])

    const filteredTasks = () => {
        return (filter === 'active')
            ? tasks.filter(t => !t.isDone)
            : (filter === 'completed')
                ? tasks.filter(t => t.isDone)
                : tasks
    }
    const tasksForTodolist = filteredTasks()
    const addTaskHandler = useCallback((newTitle: string) => {
        dispatch(addTask(todoListId, newTitle))
    }, [dispatch, todoListId])

    return {
        removeTodos,
        changeTodosTitle,
        setChangeFilterAll,
        setChangeFilterActive,
        setChangeFilterCompleted,
        tasksForTodolist,
        addTaskHandler
    }
}