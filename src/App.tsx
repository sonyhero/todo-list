import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';


function App() {
    const title1 = 'What to learn 1'

    // const tasks1 = [
    //     {id: 1, title: 'HTML&CSS', isDone: true},
    //     {id: 2, title: 'JS', isDone: true},
    //     {id: 3, title: 'ReactJS', isDone: false}
    // ]


    let [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false}
    ])

    const removeTask = (id: number) => {
        setTasks(tasks.filter(el => el.id !== id))
    }

    return (
        <div className="App">
            <Todolist title={title1} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}


export default App;
