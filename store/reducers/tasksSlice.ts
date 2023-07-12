import { ITask } from "../../models/ITask"
import { createSlice, PayloadAction} from "@reduxjs/toolkit"

type TaskState = {
    tasks: ITask[]
}

const initialState: TaskState = {
    tasks: []
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        updateTasks (state, action: PayloadAction <ITask[]>) {
            state.tasks = action.payload
        }
 
    }
})

export default tasksSlice.reducer