import React from 'react';
import {Todolist} from "./Todolist/Todolist";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {useAppSelector} from "../hooks/hooks";

export const TodolistsList = () => {

    const [todoListsRef] = useAutoAnimate<HTMLDivElement>()
    const todoLists = useAppSelector(state => state.todoLists)

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
        <div ref={todoListsRef} className={'wrapper'}>
            {todoListsComponents}
        </div>
    )
}