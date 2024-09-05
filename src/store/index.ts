import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authReducer from "./Auth/authSlice"
import { userAPI } from "@/service/userService"
import { tableAPI } from "@/service/tableService"


const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    [tableAPI.reducerPath]: tableAPI.reducer,
    authReducer 
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware, tableAPI.middleware),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']