import { createSlice, PayloadAction} from "@reduxjs/toolkit";

type AddTaskState = {
    title: string,
    description: string,
    isComplete: boolean,
    isChangeable: boolean,
}


const initialState: AddTaskState = {
    title: '',
    description: '',
    isComplete: false,
    isChangeable: true,
}

export const addTaskSlice = createSlice({
    name: "addTask",
    initialState,
    reducers: {
        setTitle (state, action: PayloadAction<string>){
            state.title = action.payload
        },

        setDescription (state, action: PayloadAction<string>){
            state.description = action.payload
        },

        setComplete (state, action: PayloadAction<boolean>){
            state.isComplete = action.payload
        },

        setChangeable (state, action: PayloadAction<boolean>){
            state.isChangeable = action.payload
        },
    }
})

export default addTaskSlice.reducer