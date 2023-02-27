import React from 'react';
import './App.css';
import Todo from "./components/Todo";


function App() {
    const title1 = 'What to learn 1'
    const title2 = 'What to learn 2'

    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]

    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
        {id: 4, title: "Yo2", isDone: false}
    ]

    return (
        <div className="App">
            <Todo title={title1} body={1} tasks={tasks1}/> {/*январь*/}
            <Todo title={title2} tasks={tasks2}/> {/*февраль*/}
        </div>

        /*<div className="App">
            <div>
                <h3>What to learn</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>*/
    );
}


export default App;
