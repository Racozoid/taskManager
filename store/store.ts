import { combineReducers, configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/tasksSlice";
import addTaskReducer from "./reducers/addTaskSlice"

const rootReducer = combineReducers({
    tasksReducer,
    addTaskReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer 
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
