import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from '../features/Todolist/Todolist';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchTodoLists} from '../reducers/todoListsReducer';
import {useAutoAnimate} from '@formkit/auto-animate/react';
import {Header} from '../components/Header/Header';
import {LinearProgress} from '../components/Loader/LinearProgress';
import {ErrorBar} from '../components/ErrorBar';

export type FilterValuesType = 'all' | 'active' | 'completed'


export const App = () => {

    const [todoListsRef] = useAutoAnimate<HTMLDivElement>()
    const todoLists = useAppSelector(state => state.todoLists)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])

    const todoListsComponents = todoLists.map(tl => {
            return (
                <Todolist
                    key={tl.id}
                    todoListId={tl.id}
                    title={tl.title}
                    filter={tl.filter}
                    entityStatus={tl.entityStatus}
                />
            )
        }
    )

    return (
        <div className="App">
            <ErrorBar/>
            <Header/>
            {status === 'loading'
                ? <LinearProgress/>
                : <div style={{height: '5px', backgroundColor: 'rgb(167, 202, 237)'}}></div>
            }
            <div ref={todoListsRef} className="wrapper">
                {todoListsComponents}
            </div>
        </div>
    )
}
