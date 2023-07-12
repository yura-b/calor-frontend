import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface IDialog {
    isOpen: boolean
    title: string | null,
    description?: string
    closeHandler?: () => void,
    submitHandler: () => void,
}

const initialState: IDialog = {
    isOpen: false,
    title: null,

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    submitHandler() {
    },


    // eslint-disable-next-line @typescript-eslint/no-empty-function
    closeHandler() {
    }
}
type IPayload = Omit<IDialog, 'isOpen'>

export const DialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        openDialog(state, action: PayloadAction<IPayload>) {
            const {submitHandler, closeHandler, description, title} = action.payload
            state.isOpen=true
            state.description = description
            state.title = title
            state.closeHandler = closeHandler
            state.submitHandler = submitHandler
        },
        closeDialog(state) {
            state.isOpen = false

            state.title = initialState.title
            state.closeHandler = initialState.closeHandler
            state.submitHandler = initialState.submitHandler
            state.description = undefined
        }
    }
});

export const {openDialog, closeDialog} = DialogSlice.actions;

export default DialogSlice.reducer;
