import {createSlice} from '@reduxjs/toolkit'
import { Cookies  } from 'react-cookie';
import ls from 'localstorage-slim';

let initialState = {email:null, username:null, picture:null, accessToken: null, loggedIn: null, id:null}


const cookies = new Cookies ();


export const counterSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logOut: (state, action) => {
            state.email = null
            state.username = null
            state.picture = null
            state.id = undefined
            state.loggedIn = false
            state.name_updates = 0;
            cookies.remove('acc')
            cookies.remove('jwt')
            ls.remove('refresh')
          
        },
        saveInfo: (state, action) => {
            state.email = action.payload.email
            state.username = action.payload.username
            state.picture = action.payload.picture
            state.id = action.payload.id
            state.name_updates = action.payload.number_name_update
            state.loggedIn = action.payload.email !== undefined
        },
        saveAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken
        }
    },
});

export const {logOut, saveInfo, saveAccessToken} = counterSlice.actions;
export default counterSlice.reducer