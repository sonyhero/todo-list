import React from 'react';
import s from './Button.module.css';

type ButtonType = {
    name: string
    callback: () => void
    className?: boolean
    xType?: string
}

export const Button = (props: ButtonType) => {

    const finalClassName = `
    ${s.button}
    ${props.xType === 'red' ? `${s.red} ${s.deleteTask}` : ''} 
    ${props.className ? s.secondary : s.default}
    `

    const onClickHandler = () => {
        props.callback()
    }
    return (
        <button className={finalClassName} onClick={onClickHandler}>{props.name}</button>
    )
}