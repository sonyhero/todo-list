import React from 'react';
import s from './ErrorBar.module.css'
import {Button} from './common/Button/Button';
import {useAppDispatch, useAppSelector} from '../hooks/hooks';
import {setAppErrorAC} from '../app/app-reducer';

export const ErrorBar = () => {

    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()

    const handleClose = () => {
        dispatch(setAppErrorAC(null))
    }

    if (error) {
        setTimeout(handleClose, 5000)
    }

    const finalClassname = (error === null) ? s.errorBar : `${s.errorBar} ${s.errorBarActive}`

    return <div className={finalClassname} >
            <div className={s.errorBarContent}>
                <div>{error}</div>
                <div><Button xType={'delete'} name={'x'} callback={handleClose}/></div>
            </div>
        </div>
}