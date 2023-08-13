import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { isARejectedTasksAction } from '../features/todolists-list/tasksReducer'
import { isARejectedTodolistsAction } from '../features/todolists-list/todoListsReducer'

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'



const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as null | string,
  isInitialized: false
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAppInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/pending')
        },
        (state) => {
          state.status = 'loading'
        })
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/fulfilled')
        },
        (state) => {
          state.status = 'succeeded'
        }
      )
      // .addMatcher(
      //   (action: AnyAction) => {
      //     return action.type === 'todolists/deleteTodolist/rejected'
      //   },
      //   (state, _) => {
      //     state.status = 'failed'
      //   }
      // )
      // .addMatcher(
      //   (action: AnyAction) => {
      //     return action.type === 'tasks/deleteTasks/rejected'
      //   },
      //   (state, _) => {
      //     state.status = 'failed'
      //   }
      // )
      // .addMatcher(
      //   (action: AnyAction) => {
      //     return action.type === 'tasks/updateTasks/rejected'
      //   },
      //   (state, _) => {
      //     state.status = 'failed'
      //   }
      // )
      .addMatcher(
        (action: AnyAction) => {
            return isARejectedTasksAction(action)
          },
        (state,_)=>{
          state.status = 'failed'
        })
      .addMatcher(
        (action: AnyAction) => {
            return isARejectedTodolistsAction(action)
          },
        (state,_)=>{
          state.status = 'failed'
        })
      .addMatcher(
        (action: AnyAction) => {
          // if (action.type === 'todolists/deleteTodolist/rejected') {
          //   return false
          // }
          // if (action.type === 'tasks/deleteTasks/rejected') {
          //   return false
          // }
          // if (action.type === 'tasks/updateTasks/rejected') {
          //   return false
          // } else return action.type.endsWith('/rejected')
         if  (isARejectedTasksAction(action)) {
           return false
         }
         if (isARejectedTodolistsAction(action)) {
           return false
         } else return action.type.endsWith('/rejected')
        },
        (state, action) => {
          const { payload, error } = action
          if (payload) {
            if (payload.showGlobalError) {
              const err = payload.data.messages.length ? payload.data.messages[0] : 'Some error occurred'
              state.error = err
              toast.error(err)
            }
          } else {
            const err = error.message ? error.message : 'Some error occurred'
            state.error = err
            toast.error(err)
          }
          state.status = 'failed'
        }
      )
  }
})



export const appReducer = slice.reducer
export const { setAppInitialized, setAppError } = slice.actions
export const appActions = slice.actions
