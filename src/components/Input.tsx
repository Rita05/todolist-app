import React, { ChangeEvent, KeyboardEvent, RefObject } from 'react';

type InputPropsType = {
    inputRef?: RefObject<HTMLInputElement>,
    placeholder: string,
    value?: string,
    className?: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = (props: InputPropsType) => {
    const {
        inputRef,
        className,
        placeholder,
        value,
        onChange,
        onKeyUp
    } = props;
    return (
        <input
            className={className}
            placeholder={placeholder}
            ref={inputRef}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
        />
    )
}
