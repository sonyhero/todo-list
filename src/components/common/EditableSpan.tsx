import React, {ChangeEvent, memo, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    onChange: (newTitle: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input onChange={onChangeHandler} onBlur={activateViewMode} value={title} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{title}</span>
    )
})