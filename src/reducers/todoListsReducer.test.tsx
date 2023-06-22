import {removeTodoListAC, todoListsReducer, TodoListDomainType} from './todoListsReducer';
import {v1} from 'uuid';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListDomainType> = [
        {
            id: todolistId1,
            title: 'What to learn',
            addedDate: new Date(),
            order: 0,
            filter: 'all',
            entityStatus: 'idle'
        },
        {
            id: todolistId2,
            title: 'What to buy',
            addedDate: new Date(),
            order: 1,
            filter: 'all',
            entityStatus: 'idle'
        }
    ]

    const endState = todoListsReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

// test('correct todolist should be added', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newTodolistTitle = "New Todolist";
//
//     const startState: Array<TodoListType> = [
//         {id: todolistId1, title: "What to learn", filter: "all", addedDate: new Date(), order: 0},
//         {id: todolistId2, title: "What to buy", filter: "all", addedDate: new Date(), order: 1}
//     ]
//
//     const endState = TodoListsReducer(startState, addTodoList(newTodolistTitle))
//
//     expect(endState.length).toBe(3);
//     expect(endState[2].title).toBe(newTodolistTitle);
//     expect(endState[2].filter).toBe("all");
//     expect(endState[2].id).toBeDefined();
// });
//
// test('correct todolist should change its name', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newTodolistTitle = "New Todolist";
//
//     const startState: Array<TodoListType> = [
//         {id: todolistId1, title: "What to learn", filter: "all", addedDate: new Date(), order: 0},
//         {id: todolistId2, title: "What to buy", filter: "all", addedDate: new Date(), order: 1}
//     ]
//
//
//     const action = changeTodoListTitle(todolistId2, newTodolistTitle);
//
//     const endState = TodoListsReducer(startState, action);
//
//     expect(endState[0].title).toBe("What to learn");
//     expect(endState[1].title).toBe(newTodolistTitle);
// });
//
// test('correct filter of todolist should be changed', () => {
//     let todolistId1 = v1();
//     let todolistId2 = v1();
//
//     let newFilter: FilterValuesType = "completed";
//
//     const startState: Array<TodoListType> = [
//         {id: todolistId1, title: "What to learn", filter: "all", addedDate: new Date(), order: 0},
//         {id: todolistId2, title: "What to buy", filter: "all", addedDate: new Date(), order: 1}
//     ]
//
//     const action = changeTodoListFilter(todolistId2, newFilter);
//
//     const endState = TodoListsReducer(startState, action);
//
//     expect(endState[0].filter).toBe("all");
//     expect(endState[1].filter).toBe(newFilter);
// });
//
//
