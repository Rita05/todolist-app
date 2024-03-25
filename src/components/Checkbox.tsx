import React, { ChangeEvent, Fragment } from 'react';
import classNames from 'classnames';


//css 
import s from './Checkbox.module.css';

type CheckboxPropsType = {
	id: string
	label: string
	className?: string
	isChecked: boolean
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = (props: CheckboxPropsType) => {
	const {
		id,
		label,
		isChecked,
		onChange,
		...rest
	} = props;

	const checkboxId = `checkbox-${id}`

	return (
		<Fragment>
			<input
				id={checkboxId}
				className={s.checkboxInput}
				type='checkbox'
				checked={isChecked}
				onChange={onChange}
				{...rest}
			/>
			<label htmlFor={checkboxId} className={classNames(s.checkboxLabel)} >
				<div className={s.checkboxMask} />
			</label>
			<span className={isChecked ? s.completedLabel : ''}>{label}</span>
		</Fragment>
	)
}
