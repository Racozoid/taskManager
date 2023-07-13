import { ITask } from "../../models/ITask";
import { createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: ITask = {
    id: '',
    title: '',
    description: '',
    changable: true,
    date: '',
    completed: true,
}

export const editTaskSlice = createSlice({
    name: "editTask",
    initialState,
    reducers: {
        setTitle(state, action: PayloadAction<string>) {
            state.title = action.payload
        },

        setDescription(state, action: PayloadAction<string>) {
            state.description = action.payload
        },
        
        setComplete(state, action: PayloadAction<boolean>) {
            state.completed = !action.payload
        },

        setAll(state, action: PayloadAction<ITask>) {
            state.id = action.payload.id
            state.title = action.payload.title
            state.description = action.payload.description
            state.changable = action.payload.changable
            state.date = action.payload.date
            state.completed = action.payload.completed
        }
    }
})

export default editTaskSlice.reducer