type TodoListHeaderPropsType = {
    title: string
}

export const TodoListHeader = (props: TodoListHeaderPropsType) => {
    const { title } = props;
    return <h3>{title}</h3>
}