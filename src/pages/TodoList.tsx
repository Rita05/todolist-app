
import { ChangeEvent, KeyboardEvent, useState } from "react";
import classNames from 'classnames';

//components
import { Button } from "../components/Button";
import { TodoListHeader } from "../components/TodoListHeader";
import { Input } from "../components/Input";
import { Checkbox } from "../components/Checkbox";

//css 
import s from './TodoList.module.css';

//types
import { tasksFilterValuesType } from "./TodoListContainer";

export type TaskType = {
  id: string
  title: string
  status: boolean
}

type TodoListPropsType = {
  title: string
  tasksFilter: tasksFilterValuesType
  tasks: Array<TaskType>
  addTask: (title: string) => void
  removeTask: (id: string) => void
  changeFilter: (filter: tasksFilterValuesType) => void
  changeTaskStatus: (id: string, status: boolean) => void
}

export const TodoList = (props: TodoListPropsType) => {

  const {
    title,
    tasks,
    addTask,
    removeTask,
    tasksFilter,
    changeFilter,
    changeTaskStatus
  } = props;

  const [inputTaskValue, setInputTaskValue] = useState('');
  const [errors, setErrors] = useState<Array<string> | []>([]);

  const inputTaskLength = inputTaskValue.length;

  const tasksList: JSX.Element = tasks.length === 0
    ? <span>Tasks list is empty</span>
    : <ul>
      {tasks.map(({ id, title, status }: TaskType) => {
        const handleRemoveTask = () => {
          removeTask(id);
        }
        const handleTaskStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
          const { checked } = event.currentTarget;
          changeTaskStatus(id, checked);
        }
        return (
          <li key={id} className={s.taskItem}>
            <Checkbox
              id={id}
              label={title}
              isChecked={status}
              onChange={handleTaskStatusChange}
            />
            <Button title={'x'} onClick={handleRemoveTask} />
          </li>
        )
      })}
    </ul>;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTaskValue(event.currentTarget.value);
  }

  const handleTaskChange = () => {
    const trimmedTaskValue = inputTaskValue.trim();
    if (trimmedTaskValue !== '') {
      addTask(inputTaskValue.trim());
    } else {
      setErrors(['This field is required']);
    };
    setInputTaskValue('');
  }

  const handleAddTaskOnKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    setErrors([]);
    if (event.key === 'Enter' && inputTaskLength) {
      handleTaskChange();
    }
  }

  const handleChangeTasksFilter = (filter: tasksFilterValuesType) => () => changeFilter(filter);

  return (
    <div className={s.todolist}>
      <TodoListHeader title={title} />
      <div>
        <Input
          className={errors.length > 0 ? s.error : ''}
          placeholder={'Enter task'}
          value={inputTaskValue}
          onChange={handleInputChange}
          onKeyUp={handleAddTaskOnKeyUp}
        />
        <Button title={'+'} onClick={handleTaskChange} isDisabled={errors.length > 0} />
        <div>
          {errors.length > 0 && (
            errors.map((error) => (
              <div className={s.errorMessage}>{error}</div>
            ))
          )}
        </div>
      </div>
      {tasksList}
      <div className={s.statusesButtonGroup}>
        <Button
          title={'All'}
          className={
            classNames(
              s.filterButton,
              [tasksFilter === 'all' ? s.activeButton : '']
            )}
          onClick={handleChangeTasksFilter('all')}
        />
        <Button
          title={'Active'}
          className={
            classNames(
              s.filterButton,
              [tasksFilter === 'active' ? s.activeButton : '']
            )}
          onClick={handleChangeTasksFilter('active')}
        />
        <Button
          title={'Completed'}
          className={
            classNames(
              s.filterButton,
              [tasksFilter === 'completed' ? s.activeButton : '']
            )}
          onClick={handleChangeTasksFilter('completed')}
        />
      </div>
    </div >
  )
}
