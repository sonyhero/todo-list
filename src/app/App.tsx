import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {fetchTodoLists} from '../reducers/todoListsReducer';
import {Header} from '../components/Header/Header';
import {LinearProgress} from '../components/Loader/LinearProgress';
import {ErrorBar} from '../components/ErrorBar';
import {Navigate, Route, Routes} from "react-router-dom";
import {TodolistsList} from "../features/TodolistsList";
import {Login} from "../features/Login/Login";
import {Error404} from "../components/Error404/Error404";

export type FilterValuesType = 'all' | 'active' | 'completed'


export const App = () => {


    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodoLists())
    }, [])


    return (
        <div className={'App'}>
            <ErrorBar/>
            <Header/>
            {status === 'loading'
                ? <LinearProgress/>
                : <div style={{height: '5px', backgroundColor: 'rgb(167, 202, 237)'}}></div>
            }
            <Routes>
                <Route path={'/'} element={<TodolistsList/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/404'} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
        </div>
    )
}
