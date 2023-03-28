import React, {useState} from 'react';
import './App.css';
import { Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [ todoLists, setTodoLists] = useState([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])


    const [tasks, setTasks] = useState({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Salt', isDone: true},
            {id: v1(), title: 'Water', isDone: false},
            {id: v1(), title: 'Beer', isDone: false},
        ],
    });

    const changeIsDone = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: newIsDone} : el))
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const tasksForTodolist = () => {
        // if (filter === 'active') {
        //     tasksFilterIsDone = tasks.filter(t => !t.isDone);
        // }
        // if (filter === 'completed') {
        //     tasksFilterIsDone = tasks.filter(t => t.isDone);
        // }
        // return tasksFilterIsDone
        return (filter === 'active')
                ? tasks.filter(t => !t.isDone)
                : (filter === 'completed')
                ? tasks.filter(t => t.isDone)
                : tasks
    }


    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist()}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeIsDone={changeIsDone}
                      filter={filter}
            />
        </div>
    );
}

export default App;
