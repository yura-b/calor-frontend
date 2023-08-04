import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PageSection} from '@/constants/interfaces/pageSection.ts';

export interface IState {
    isDisable: boolean;
    pageSections: PageSection[];
}


export const initialState: IState = {
    isDisable: true,
    pageSections: [],
};

export const pageSlice = createSlice({
    name: 'pageManager',
    initialState,
    reducers: {
        setPages: (state, action: PayloadAction<PageSection[]>) => {
            state.pageSections = action.payload
        },
        toggleEditing: (state, action: PayloadAction<boolean>) => {
            state.isDisable = action.payload
        },
        setSpecificField: (state, action: PayloadAction<{ id: unknown, value: string }>) => {
            const record = state.pageSections.find(el => el._id === action.payload.id)
            state.pageSections = state.pageSections.map(section=>{
                if (section._id === record?._id) {
                    return {
                        ...record,
                        value: action.payload.value
                    }
                }
                return section
            })
        }
    },
});

export const {setPages, setSpecificField, toggleEditing} = pageSlice.actions;

export default pageSlice.reducer;
