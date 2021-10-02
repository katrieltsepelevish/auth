import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { parseErrors } from '../helpers/errors'

// @desc    Confirm email
// @access  Private
export const confirmEmail = createAsyncThunk(
    'users/confirm-email',
    async (code, thunkAPI) => {
        try {
            const token = localStorage.getItem('token')

            // User authentication header for Authenticated user middleware
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
                header: {
                    'Content-Type': 'applications/json',
                },
            }

            const response = await axios.post(
                '/api/auth/confirm',
                { code },
                config
            )

            const { data } = response

            if (response.status === 200) {
                return data
            }

            return thunkAPI.rejectWithValue(data)
        } catch (error) {
            error.response.data.message = parseErrors(
                error.response.data.message
            )
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

// @desc    Resend email confirmation
// @access  Private
export const resendConfirmEmail = createAsyncThunk(
    'users/resend-confirm-email',
    async (thunkAPI) => {
        try {
            const token = localStorage.getItem('token')

            // User authentication header for Authenticated user middleware
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }

            const response = await axios.post('/api/auth/resend', {}, config)

            const { data } = response

            if (response.status === 200) {
                return data
            }

            return thunkAPI.rejectWithValue(data)
        } catch (error) {
            error.response.data.message = parseErrors(
                error.response.data.message
            )
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

// @desc    Get user information
// @access  Private
export const getUserInfo = createAsyncThunk(
    'users/get-info',
    async (thunkAPI) => {
        try {
            const token = localStorage.getItem('token')

            // User authentication header for Authenticated user middleware
            const config = {
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            }

            const response = await axios.get('/api/auth', config)

            const { data } = response

            if (response.status === 200) {
                return data
            }

            return thunkAPI.rejectWithValue(data)
        } catch (error) {
            error.response.data.message = parseErrors(
                error.response.data.message
            )
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

// @desc    Send password reset mail
// @access  public
export const forgotPassword = createAsyncThunk(
    'users/forgot-password',
    async (email, thunkAPI) => {
        try {
            const config = {
                header: {
                    'Content-Type': 'applications/json',
                },
            }

            const response = await axios.post(
                '/api/auth/password-forgot',
                {
                    email,
                },
                config
            )

            const { data } = response

            if (response.status === 200) {
                return data
            }

            return thunkAPI.rejectWithValue(data)
        } catch (error) {
            error.response.data.message = parseErrors(
                error.response.data.message
            )
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

// @desc    Reset user password
// @access  public
export const resetPassword = createAsyncThunk(
    'users/reset-password',
    async ({ token, password, confirmPassword }, thunkAPI) => {
        try {
            const config = {
                header: {
                    'Content-Type': 'applications/json',
                },
            }

            const response = await axios.post(
                '/api/auth/password-reset',
                {
                    token,
                    password,
                    confirmPassword,
                },
                config
            )

            const { data } = response

            if (response.status === 200) {
                return data
            }

            return thunkAPI.rejectWithValue(data)
        } catch (error) {
            error.response.data.message = parseErrors(
                error.response.data.message
            )
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

// @desc    Log into user
// @access  public
export const loginUser = createAsyncThunk(
    'users/login',
    async ({ email, password }, thunkAPI) => {
        try {
            const config = {
                header: {
                    'Content-Type': 'applications/json',
                },
            }

            const response = await axios.post(
                '/api/auth/login',
                {
                    email,
                    password,
                },
                config
            )

            const { data } = response

            if (response.status === 200) {
                localStorage.setItem('token', data.token)
                return { ...data, email }
            }

            return thunkAPI.rejectWithValue(data)
        } catch (error) {
            error.response.data.message = parseErrors(
                error.response.data.message
            )
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

// @desc    Register new user
// @access  public
export const registerUser = createAsyncThunk(
    'users/register',
    async ({ name, email, password, confirmPassword }, thunkAPI) => {
        try {
            const config = {
                header: {
                    'Content-Type': 'applications/json',
                },
            }

            const response = await axios.post(
                '/api/auth/register',
                {
                    name,
                    email,
                    password,
                    confirmPassword,
                },
                config
            )

            const { data } = response

            if (response.status === 200) {
                localStorage.setItem('token', data.token)
                return { ...data, email }
            }

            return thunkAPI.rejectWithValue(data)
        } catch (error) {
            error.response.data.message = parseErrors(
                error.response.data.message
            )
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            name: '',
            email: '',
        },
        isFetching: false,
        isSuccess: false,
        isError: false,
        errorMessage: [],
    },
    reducers: {
        clearState: (state) => {
            state.userInfo = {
                name: '',
                email: '',
            }
            state.isError = false
            state.isSuccess = false
            state.errorMessage = []
        },
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, action) => {
            state.userInfo.name = action.payload.name
            state.userInfo.email = action.payload.email
            state.isError = false
            state.isFetching = false
            state.isSuccess = true
            return state
        },
        [loginUser.rejected]: (state, action) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = action.payload.message
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true
        },
        [registerUser.fulfilled]: (state, action) => {
            state.userInfo.name = action.payload.name
            state.userInfo.email = action.payload.email
            state.isError = false
            state.isFetching = false
            state.isSuccess = true
            return state
        },
        [registerUser.rejected]: (state, action) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = action.payload.message
        },
        [registerUser.pending]: (state) => {
            state.isFetching = true
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.userInfo = { ...action.payload }
            state.isError = false
            state.isFetching = false
            state.isSuccess = true
            return state
        },
        [getUserInfo.rejected]: (state, action) => {
            state.userInfo = {
                name: '',
                email: '',
            }
            state.isFetching = false
            state.isError = true
            state.errorMessage = action.payload.message
        },
        [getUserInfo.pending]: (state) => {
            state.isFetching = true
        },
        [confirmEmail.fulfilled]: (state) => {
            state.isError = false
            state.isFetching = false
            state.isSuccess = true
        },
        [confirmEmail.rejected]: (state, action) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = action.payload.message
        },
        [confirmEmail.pending]: (state) => {
            state.isFetching = true
        },
        [forgotPassword.fulfilled]: (state) => {
            state.isError = false
            state.isFetching = false
            state.isSuccess = true
        },
        [forgotPassword.rejected]: (state, action) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = action.payload.message
        },
        [forgotPassword.pending]: (state) => {
            state.isFetching = true
        },
        [resetPassword.fulfilled]: (state) => {
            state.isError = false
            state.isFetching = false
            state.isSuccess = true
        },
        [resetPassword.rejected]: (state, action) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = action.payload.message
        },
        [resetPassword.pending]: (state) => {
            state.isFetching = true
        },
        [resendConfirmEmail.fulfilled]: (state) => {
            state.isError = false
            state.isFetching = false
            state.isSuccess = true
        },
        [resendConfirmEmail.rejected]: (state, action) => {
            state.isFetching = false
            state.isError = true
            state.errorMessage = action.payload.message
        },
        [resendConfirmEmail.pending]: (state) => {
            state.isFetching = true
        },
    },
})

export const { clearState } = userSlice.actions

export default userSlice.reducer
