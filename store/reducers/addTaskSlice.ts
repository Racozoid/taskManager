import { createSlice, PayloadAction} from "@reduxjs/toolkit"

type TaskFormState = {
    title: string,
    description: string,
    isComplete: boolean,
    isChangeable: boolean,
}

const initialState: TaskFormState = {
    title: '',
    description: '',
    isComplete: false,
    isChangeable: true,
}

export const addTaskSlice = createSlice({
    name: 'addTask',
    initialState,
    reducers: {
        setComplete (state) {
            state.isComplete != state.isComplete
        },

        setChangeable (state) {
            state.isChangeable != state.isChangeable
        },

        setTitle (state, action: PayloadAction<any>) {
            state.title = action.payload
        },

        setDescription (state, action: PayloadAction<string>) {
            state.description = action.payload
        }

    }
})

export default addTaskSlice.reducer