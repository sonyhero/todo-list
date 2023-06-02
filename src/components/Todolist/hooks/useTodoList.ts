import {useAppDispatch, useAppSelector} from '../../../hooks/hooks';
import {useCallback} from 'react';
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from '../../../reducers/todoListsReducer';
import {AddTaskAC} from '../../../reducers/tasksReducer';
import {FilterValuesType} from '../../../App';

export const useTodoList = (title: string, todoListId: string, filter: FilterValuesType) => {

    const tasks = useAppSelector(state => state.tasks[todoListId])
    const dispatch = useAppDispatch()

    // CRUD operations for TodoLists
    const removeTodoList = useCallback(() => {
        dispatch(RemoveTodoListAC(todoListId))
    }, [dispatch, todoListId])
    const changeTodoListTitle = useCallback((newTitle: string) => {
        dispatch(ChangeTodoListTitleAC(newTitle, todoListId))
    }, [dispatch, todoListId])

    const setChangeFilterAll = useCallback(() => {
        dispatch(ChangeTodoListFilterAC(todoListId, 'all'))
    }, [dispatch, todoListId])
    const setChangeFilterActive = useCallback(() => {
        dispatch(ChangeTodoListFilterAC(todoListId, 'active'))
    }, [dispatch, todoListId])
    const setChangeFilterCompleted = useCallback(() => {
        dispatch(ChangeTodoListFilterAC(todoListId, 'completed'))
    }, [dispatch, todoListId])


    const filteredTasks = () => {
        return (filter === 'active')
            ? tasks.filter(t => !t.isDone)
            : (filter === 'completed')
                ? tasks.filter(t => t.isDone)
                : tasks
    }

    const tasksForTodolist = filteredTasks()

    const addTask = useCallback((newTitle: string) => {
        dispatch(AddTaskAC(todoListId, newTitle))
    }, [dispatch, todoListId])

    return {
        removeTodoList,
        changeTodoListTitle,
        setChangeFilterAll,
        setChangeFilterActive,
        setChangeFilterCompleted,
        tasksForTodolist,
        addTask
    }
}