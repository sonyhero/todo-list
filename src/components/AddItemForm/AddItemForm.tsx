import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './AddItemForm.module.css';
import {Button} from '../Button/Button';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') addTaskHandler()
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        if (newTitle.trim() !== '') {
            props.addItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Ошибка')
        }
    }

    const finalInputClassName = s.input
        + (error ? ' ' + s.errorInput : '')

    return (
        <div className={s.itemForm}>
            <input value={newTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   // className={error ? s.error : ''}
                   className={finalInputClassName}
            />
            <Button name={'Add'} callback={addTaskHandler} />
            {/*<button onClick={addTaskHandler}>+</button>*/}
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )
}