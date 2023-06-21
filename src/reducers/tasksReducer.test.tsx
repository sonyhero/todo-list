export {}
//import {addTask, changeTaskStatus, changeTaskTitle, removeTask, TasksReducer} from './tasksReducer'
// import {TasksStateType} from '../App'
// import {addTodoList, removeTodoList, TodoListsReducer, TodoListType} from './todoListsReducer';
//
// test('correct task should be deleted from correct array', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '2', title: 'JS', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '3', title: 'React', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '2', title: 'milk', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '3', title: 'tea', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'}
//         ]
//     }
//
//     const action = removeTask('2', 'todolistId2')
//
//     const endState = TasksReducer(startState, action)
//
//     expect(endState).toEqual({
//         'todolistId1': [
//             {id: '1', title: 'CSS', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '2', title: 'JS', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '3', title: 'React', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//
//             {id: '3', title: 'tea', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'}
//         ]
//     })
// })
//
// test('correct task should be added to correct array', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '2', title: 'JS', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '3', title: 'React', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '2', title: 'milk', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '3', title: 'tea', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'}
//         ]
//     }
//
//     const action = addTask('juce', 'todolistId2')
//
//     const endState = TasksReducer(startState, action)
//
//     expect(endState['todolistId1'].length).toBe(3)
//     expect(endState['todolistId2'].length).toBe(4)
//     expect(endState['todolistId2'][0].id).toBeDefined()
//     expect(endState['todolistId2'][0].title).toBe('juce')
//     expect(endState['todolistId2'][0].status).toBe(2)
// })
//
//
// test('status of specified task should be changed', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '2', title: 'JS', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '3', title: 'React', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '2', title: 'milk', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '3', title: 'tea', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'}
//         ]
//     }
//
//     const action = changeTaskStatus("todolistId2","2", false, );
//
//     const endState = TasksReducer(startState, action)
//
//     expect(endState["todolistId1"][1].status).toBe(2);
//     expect(endState["todolistId2"][1].status).toBe(0);
// });
//
// test('title of specified task should be changed', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '2', title: 'JS', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '3', title: 'React', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '2', title: 'milk', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '3', title: 'tea', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'}
//         ]
//     }
//
//     const action = changeTaskTitle("2", 'beer', "todolistId2");
//
//     const endState = TasksReducer(startState, action)
//
//     expect(endState["todolistId1"][1].title).toBe('JS');
//     expect(endState["todolistId2"][1].title).toBe('beer');
// });
//
// test('new array should be added when new todolist is added', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '2', title: 'JS', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '3', title: 'React', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '2', title: 'milk', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '3', title: 'tea', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'}
//         ]
//     }
//
//     const action = addTodoList('new todolist')
//
//     const endState = TasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState)
//     const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
//     if (!newKey) {
//         throw Error('new key should be added')
//     }
//
//     expect(keys.length).toBe(3)
//     expect(endState[newKey]).toEqual([])
// })
//
// test('ids should be equals', () => {
//     const startTasksState: TasksStateType = {};
//     const startTodolistsState: Array<TodoListType> = [];
//
//     const action = addTodoList("new todolist");
//
//     const endTasksState = TasksReducer(startTasksState, action)
//     const endTodolistsState = TodoListsReducer(startTodolistsState, action)
//
//     const keys = Object.keys(endTasksState);
//     const idFromTasks = keys[0];
//     const idFromTodolists = endTodolistsState[0].id;
//
//     expect(idFromTasks).toBe(action.payload.todoListId);
//     expect(idFromTodolists).toBe(action.payload.todoListId);
// });
//
// test('property with todolistId should be deleted', () => {
//     const startState: TasksStateType = {
//         'todolistId1': [
//             {id: '1', title: 'CSS', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '2', title: 'JS', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'},
//             {id: '3', title: 'React', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId1'}
//         ],
//         'todolistId2': [
//             {id: '1', title: 'bread', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '2', title: 'milk', status: 2, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'},
//             {id: '3', title: 'tea', status: 0, addedDate: new Date(),startDate: '', deadline: '', description: '', order: 0, priority: 0, todoListId: 'todolistId2'}
//         ]
//     }
//
//     const action = removeTodoList("todolistId2");
//
//     const endState = TasksReducer(startState, action)
//
//
//     const keys = Object.keys(endState);
//
//     expect(keys.length).toBe(1);
//     expect(endState["todolistId2"]).not.toBeDefined();
//     expect(startState["todolistId2"]).toBeDefined();
// });