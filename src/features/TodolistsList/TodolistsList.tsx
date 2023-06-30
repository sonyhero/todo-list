import React, {useEffect} from 'react';
import {Todolist} from "./Todolist/Todolist";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate} from "react-router-dom";
import {fetchTodoLists} from "./todoListsReducer";
import s from './TodolistsList.module.css'
import {selectTodolists} from './todolists-selectors';
import {selectIsLoggedIn} from '../Login/auth-selectors';

export const TodolistsList = () => {

    const [todoListsRef] = useAutoAnimate<HTMLDivElement>()
    const todoLists = useAppSelector(selectTodolists)
    const isLoggedIn = useAppSelector(selectIsLoggedIn)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!isLoggedIn) {
            return
        }
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

    return (!isLoggedIn)
        ? <Navigate to={'/login'}/>
        : <div ref={todoListsRef} className={s.wrapper}>
            {todoListsComponents}
        </div>
}