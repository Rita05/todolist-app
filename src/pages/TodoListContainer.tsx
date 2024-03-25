import React, { useState } from 'react';
import { v1 } from 'uuid';

//components
import { TodoList } from './TodoList';

//types
import { TaskType } from './TodoList';

export type tasksFilterValuesType = 'all' | 'active' | 'completed';

export const TodoListContainer = () => {

    const todoListTitle = 'TodoList';
    const initialTasks: Array<TaskType> = [
        {
            id: v1(),
            title: 'Do homework on React',
            status: true,
        },
        {
            id: v1(),
            title: 'Do homework on JS',
            status: false,
        },
        {
            id: v1(),
            title: 'Do exams of the current sprint week',
            status: true,
        },
        {
            id: v1(),
            title: 'Learn theory for the interview',
            status: false,
        }
    ]

    const [tasks, setTasks] = useState<Array<TaskType>>(initialTasks);
    const [tasksFilter, setTasksFilter] = useState<tasksFilterValuesType>('all');

    const getFilteredTasks = (tasks: Array<TaskType>, currentFilter: tasksFilterValuesType): Array<TaskType> => {
        switch (currentFilter) {
            case 'active':
                return tasks.filter(task => !task.status);

            case 'completed':
                return tasks.filter(task => task.status);

            default:
                return tasks;
        }
    }

    const filteredTasks = getFilteredTasks(tasks, tasksFilter);

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            status: false,
        };

        setTasks([newTask, ...tasks]);
    }

    const onChangeFilter = (filter: tasksFilterValuesType) => {
        setTasksFilter(filter);
    }

    const onChangeTaskStatus = (taskId: string, taskStatus: boolean) => {
        const updatedTasks = tasks.map((task) => {
            return task.id === taskId ? { ...task, status: taskStatus } : task;
        })
        setTasks(updatedTasks);
    }
    return (
        <TodoList
            title={todoListTitle}
            tasksFilter={tasksFilter}
            tasks={filteredTasks}
            removeTask={removeTask}
            addTask={addTask}
            changeFilter={onChangeFilter}
            changeTaskStatus={onChangeTaskStatus}
        />
    )

}