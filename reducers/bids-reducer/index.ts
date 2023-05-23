import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Bid, bidModel } from "../../src/models/bid"
export type BidsNetworkStatus =
    'create-bid' |
    'create-bid-success' |
    'create-bid-error' |
    'fetch-bids' |
    'fetch-bids-success' |
    'fetch-bids-error' |
    'fetch-bid' |
    'fetch-bid-success' |
    'fetch-bid-error' | ''


type BidsState = {
    bid: Bid
    bids: Bid[]
    bidsNetworkStatus: BidsNetworkStatus
}

const initialState: BidsState = {
    bid: bidModel,
    bids: [],
    bidsNetworkStatus: ''

}


const bidsSlice = createSlice({
    name: 'bidsSlice',
    initialState,
    reducers: {
        setBid: (state, { payload }: PayloadAction<Bid>) => {
            state.bid = payload
        },
        setBidProps: (state, { payload }: PayloadAction<{ name: string, value: any }>) => {
            state.bid = { ...state.bid, [payload.name]: payload.value }
        },
        setBids: (state, { payload }: PayloadAction<Bid[]>) => {
            state.bids = payload
        },
        setBidsNetworkStatus: (state, { payload }: PayloadAction<BidsNetworkStatus>) => {
            state.bidsNetworkStatus = payload
        }
    }
})

export const bidsActions = bidsSlice.actions
export default bidsSlice.reducer