import { authReducer } from './auth.slice'

describe('authReducer', () => {
  it('should handle login.fulfilled', () => {
    const initialState = {
      isLoggedIn: false,
      captchaUrl: ''
    }

    const action = { type: 'auth/login/fulfilled', payload: { isLoggedIn: true } }
    const newState = authReducer(initialState, action)

    expect(newState.isLoggedIn).toBe(true)
  })

  it('should handle logout.fulfilled', () => {
    const initialState = {
      isLoggedIn: true,
      captchaUrl: ''
    }

    const action = { type: 'auth/logout/fulfilled', payload: { isLoggedIn: false } }
    const newState = authReducer(initialState, action)

    expect(newState.isLoggedIn).toBe(false)
  })

  it('should handle initializeApp.fulfilled', () => {
    const initialState = {
      isLoggedIn: false,
      captchaUrl: ''
    }

    const action = { type: 'auth/initializeApp/fulfilled', payload: { isLoggedIn: true } }
    const newState = authReducer(initialState, action)

    expect(newState.isLoggedIn).toBe(true)
  })

  it('should handle getCaptcha.fulfilled', () => {
    const initialState = {
      isLoggedIn: false,
      captchaUrl: ''
    }

    const action = { type: 'auth/getCaptcha/fulfilled', payload: { captchaUrl: 'https://example.com/captcha.png' } }
    const newState = authReducer(initialState, action)

    expect(newState.captchaUrl).toBe('https://example.com/captcha.png')
  })
})

// jest.mock('../../api/api')
// const authAPIMock = authAPI as jest.Mocked<typeof authAPI>
// const result: ResponseAppType<{ userId: number }> = {
//   resultCode: ResultCode.success,
//   messages: [],
//   fieldsErrors: [],
//   data: {
//     userId: 1
//   }
// }


// describe('authThunks', () => {
//   it('login thunk should dispatch getCaptcha if resultCode is captcha', async () => {
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//
//     const loginParams: LoginParamsType = { email:'test@gmail.com', password:'qwerty123', rememberMe: true, captcha: 'string' };
//     const loginThunk = authThunks.login(loginParams);
//
//     const authAPItest = require(); // Replace with your actual authAPI import
//     authAPI.login = jest.fn().mockResolvedValue({ resultCode: ResultCode.captcha });
//
//     await loginThunk(dispatch, getState, {});
//
//     expect(dispatch).toHaveBeenCalledWith(authThunks.getCaptcha());
//   });
//
//   it('login thunk should reject with value if resultCode is not success', async () => {
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//     const extra = { dispatch, getState };
//
//     const loginParams = { username: 'test', password: 'password' };
//     const loginThunk = authThunks.login(loginParams);
//
//     const authAPI = require('./authAPI'); // Replace with your actual authAPI import
//     authAPI.login = jest.fn().mockResolvedValue({ resultCode: ResultCode.error, fieldsErrors: [] });
//
//     const rejectWithValueMock = jest.fn();
//     const rejectWithValue = (payload) => {
//       rejectWithValueMock(payload);
//       return { type: 'rejectedAction' };
//     };
//
//     await loginThunk(extra, rejectWithValue);
//
//     expect(rejectWithValueMock).toHaveBeenCalledWith({ data: { resultCode: ResultCode.error, fieldsErrors: [] }, showGlobalError: true });
//     expect(dispatch).toHaveBeenCalledWith({ type: 'rejectedAction' });
//   });
//
//   it('logout thunk should dispatch getCaptcha if resultCode is captcha', async () => {
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//     const extra = { dispatch, getState };
//
//     const logoutThunk = authThunks.logout();
//
//     const authAPI = require('./authAPI'); // Replace with your actual authAPI import
//     authAPI.logout = jest.fn().mockResolvedValue({ resultCode: ResultCode.captcha });
//
//     await logoutThunk(extra);
//
//     expect(dispatch).toHaveBeenCalledWith(authThunks.getCaptcha());
//   });
//
//   it('logout thunk should dispatch clearTasksAndTodolists and return { isLoggedIn: false } if resultCode is success', async () => {
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//     const extra = { dispatch, getState };
//
//     const logoutThunk = authThunks.logout();
//
//     const authAPI = require('./authAPI'); // Replace with your actual authAPI import
//     authAPI.logout = jest.fn().mockResolvedValue({ resultCode: ResultCode.success });
//
//     const clearTasksAndTodolists = require('./yourOtherActions'); // Replace with your actual import for clearTasksAndTodolists action
//     const clearTasksAndTodolistsAction = { type: 'clearTasksAndTodolistsAction' };
//     clearTasksAndTodolists.clearTasksAndTodolists = jest.fn().mockReturnValue(clearTasksAndTodolistsAction);
//
//     const result = await logoutThunk(extra);
//
//     expect(dispatch).toHaveBeenCalledWith(clearTasksAndTodolistsAction);
//     expect(result).toEqual({ isLoggedIn: false });
//   });
//
//   //javascript
//   it('initializeApp thunk should dispatch setAppInitialized with isInitialized: true', async () => {
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//     const extra = { dispatch, getState };
//
//     const initializeAppThunk = authThunks.initializeApp();
//
//     const authAPI = require('./authAPI'); // Replace with your actual authAPI import
//     authAPI.me = jest.fn().mockResolvedValue({ resultCode: ResultCode.success });
//
//     const setAppInitialized = require('./yourOtherActions'); // Replace with your actual import for setAppInitialized action
//     const setAppInitializedAction = { type: 'setAppInitializedAction' };
//     setAppInitialized.setAppInitialized = jest.fn().mockReturnValue(setAppInitializedAction);
//
//     await initializeAppThunk(extra);
//
//     expect(dispatch).toHaveBeenCalledWith(setAppInitializedAction);
//   });
//
//   it('initializeApp thunk should reject with value if resultCode is not success', async () => {
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//     const extra = { dispatch, getState };
//
//     const initializeAppThunk = authThunks.initializeApp();
//
//     const authAPI = require('./authAPI'); // Replace with your actual authAPI import
//     authAPI.me = jest.fn().mockResolvedValue({ resultCode: ResultCode.error });
//
//     const rejectWithValueMock = jest.fn();
//     const rejectWithValue = (payload) => {
//       rejectWithValueMock(payload);
//       return { type: 'rejectedAction' };
//     };
//
//     await initializeAppThunk(extra, rejectWithValue);
//
//     expect(rejectWithValueMock).toHaveBeenCalledWith({ data: { resultCode: ResultCode.error }, showGlobalError: true });
//     expect(dispatch).toHaveBeenCalledWith({ type: 'rejectedAction' });
//   });
//
//   it('getCaptcha thunk should dispatch getCaptcha.fulfilled with captchaUrl', async () => {
//     const dispatch = jest.fn();
//     const getState = jest.fn();
//     const extra = { dispatch, getState };
//
//     const getCaptchaThunk = authThunks.getCaptcha();
//
//     const securityAPI = require('./securityAPI'); // Replace with your actual securityAPI import
//     securityAPI.getCaptchaUrl = jest.fn().mockResolvedValue({ url: 'https://example.com/captcha.png' });
//
//     await getCaptchaThunk(extra);
//
//     expect(dispatch).toHaveBeenCalledWith({
//       type: 'auth/getCaptcha/fulfilled',
//       payload: { captchaUrl: 'https://example.com/captcha.png' }
//     });
//   });
// });