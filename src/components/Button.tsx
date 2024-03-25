
type ButtonPropsType = {
	title: string
	className?: string
	onClick?: () => void
	isDisabled?: boolean
}

export const Button = (props: ButtonPropsType) => {
	const {
		title,
		onClick,
		isDisabled,
		className
	} = props;
	return (
		<button
			className={className}
			onClick={onClick}
			disabled={isDisabled}
		>
			{title}
		</button>
	)

}