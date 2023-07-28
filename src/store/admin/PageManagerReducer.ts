import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {PageSection} from '@/constants/interfaces/pageSection.ts';

export interface IState {
    isEnable: boolean;
    pageSections: PageSection[];
}


export const initialState: IState = {
    isEnable: false,
    pageSections: [],
};

export const pageSlice = createSlice({
    name: 'pageManager',
    initialState,
    reducers: {
        setPages: (state, action: PayloadAction<PageSection[]>) => {
            state.pageSections = action.payload
        },
        toggleEditing: (state) => {
            state.isEnable = !state.isEnable
        },
        setSpecificField: (state, action: PayloadAction<{ title: unknown, value: string }>) => {
            const record = state.pageSections.filter(el => el.title === action.payload.title)[0]
            state.pageSections = state.pageSections.map(section=>{
                if (section._id === record._id) {
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
