import React, {ChangeEvent} from 'react';

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
        <input disabled={disabled} type="checkbox" checked={checked} onChange={onChangeHandler}/>
    );
};