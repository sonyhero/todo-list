import React, {ChangeEvent} from 'react';
import s from './CheckBox.module.css'

type PropsType = {
    checked: boolean
    callBack: (e: boolean) => void
    disabled?: boolean
}
export const CheckBox: React.FC<PropsType> = (props) => {
    const {checked, callBack, disabled} = props
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }
    return (
        <input className={s.checkbox} disabled={disabled} type="checkbox" checked={checked} onChange={onChangeHandler}/>
    );
};