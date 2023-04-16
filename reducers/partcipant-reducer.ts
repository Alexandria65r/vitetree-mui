import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Participant } from '../src/reusable/interfaces'

type ParticipantState = {
   
    partcipant: Participant,
    isPreparigPartcipant: boolean
    partcipants: Participant[],
    isPartcipantDeleting: boolean
}
const initialState: ParticipantState = {
    partcipant: {
        fullname: '',
        email: '',
        reason: '',
        testId: '',
        score: '0%',
        taken: false
    },
    isPreparigPartcipant: false,
    partcipants: [],
    isPartcipantDeleting: false
}

const partcipantSlice = createSlice({
    name: 'partcipantSlice',
    initialState,
    reducers: {
   
        setPartcipant: (state, { payload }: PayloadAction<Participant>) => {
            state.partcipant = payload
        },
        setIsPreparigPartcipant: (state, { payload }: PayloadAction<boolean>) => {
            state.isPreparigPartcipant = payload
        },
        setPartcipants: (state, { payload }: PayloadAction<Participant[]>) => {
            state.partcipants = payload
        },
      
        setIsPartcipantDeleting: (state, { payload }: PayloadAction<boolean>) => {
            state.isPartcipantDeleting = payload
        }
    },

})


export const partcipantActions = partcipantSlice.actions
export default partcipantSlice.reducer