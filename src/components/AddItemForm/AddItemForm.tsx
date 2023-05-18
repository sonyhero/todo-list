import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import s from './AddItemForm.module.css';
import {Button} from '../Button/Button';

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = memo(({addItem}) => {

    console.log('AddItemForm render')

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }
        if (event.key === 'Enter') addTaskHandler()
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    const addTaskHandler = useCallback(() => {
        if (newTitle.trim() !== '') {
            addItem(newTitle.trim())
            setNewTitle('')
        } else {
            setError('Ошибка')
        }
    }, [newTitle, addItem])

    const finalInputClassName = s.input
        + (error ? ' ' + s.errorInput : '')

    return (
        <div>
            <div className={s.itemForm}>
                <input value={newTitle}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                    // className={error ? s.error : ''}
                       className={finalInputClassName}
                />
                <Button name={'Add'} callback={addTaskHandler}/>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
        </div>
    )
})