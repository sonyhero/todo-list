import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';

export type FilterType = 'All' | 'Active' | 'Completed'

function App() {
    const title1 = 'What to learn 1'

    const tasks1 = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ]

    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }
    //
    // const removeTask = (id: number) => {
    //     setTasks(tasks.filter(el => el.id !== id))
    // }
    //
    // let [filter, setFilter] = useState('All')
    //
    // let filteredTask = tasks
    // if (filter === 'Active') {
    //     filteredTask = tasks.filter(el => !el.isDone)
    // }
    // if (filter === 'Completed') {
    //     filteredTask = tasks.filter(el => el.isDone)
    // }
    // const filterTask = (buttonName: FilterType) => {
    //     setFilter(buttonName)
    // }

    return (
        <div className="App">
            <Todolist title={title1}
                      removeTask={removeTask}
                      tasks={tasks1}
                    /*filterTask={filterTask}*//>
        </div>
    );
}

export default App;