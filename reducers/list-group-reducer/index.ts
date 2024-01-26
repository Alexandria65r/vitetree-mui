import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ListGroup, ListGroupSchema } from '../../src/models/list-group';

export type ListGroupNetworkStatus =
    'creating' |
    'creating-error' |
    'creating-success' |
    'fetching' |
    'fetching-error' |
    'fetching-success' |
    'updating' |
    'updating-error' |
    'updating-success' |
    'deleting' |
    'deleting-error' |
    'deleting-success' | ''


export type GroupAction = {
    groupId?: string
    action: 'sub-element' | 'edit-group-name' | 'edit-sub-element' | 'add-sub-element' | 'toggle-group-delete-button' | 'mark-parents' | 'mark-children' | ''
}


type ListGroupState = {
    newListGroupName: string
    listGroup: ListGroup;
    listGroups: ListGroup[];
    checkedGroups: string[],
    isNewGroupInputOpen: boolean;
    listGroupNetworkStatus: ListGroupNetworkStatus
    groupAction: GroupAction
    droppableId: 'list-groups' | 'elements' | string
}


const initialState: ListGroupState = {
    listGroup: ListGroupSchema,
    listGroups: [],
    isNewGroupInputOpen: false,
    listGroupNetworkStatus: '',
    newListGroupName: '',
    groupAction: {
        groupId: undefined,
        action: ''
    },
    checkedGroups: [],
    droppableId: ''
}




const listGroupSlice = createSlice({
    name: 'listGroupSlice',
    initialState,
    reducers: {
        setIsNewGroupInputOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isNewGroupInputOpen = payload
        },
        setListGroupData: (state, { payload }: PayloadAction<ListGroup>) => {
            state.listGroup = payload
        },
        updateGroup(state, { payload }: PayloadAction<{ id: string, update: { key: string, value: any } }>) {
            const group = state.listGroups.find((el) => el._id === payload.id)
            if (group) {
                const index = state.listGroups.indexOf(group)
                state.listGroups.splice(index, 1, { ...group, [payload.update.key]: payload.update.value })
            }
        },
        deleteGroup(state, { payload }: PayloadAction<string>) {
            state.listGroups = state.listGroups.filter((group) => group._id !== payload)
        },
        setListGroupName: (state, { payload }: PayloadAction<string>) => {
            state.newListGroupName = payload
        },
        setListGroups: (state, { payload }: PayloadAction<ListGroup[]>) => {
            state.listGroups = payload
        },
        setGroupAction: (state, { payload }: PayloadAction<GroupAction>) => {
            if (state.groupAction.action === payload.action) {
                state.groupAction = { action: '', groupId: '' }
            } else {
                state.groupAction = payload
            }
        },
        clearGroupAction: (state,) => {
            state.groupAction = {
                action: '',
                groupId: ''
            }
        },
        checkGroup(state, { payload }: PayloadAction<string>) {
            const isExist = state.checkedGroups.find((id) => id === payload)
            if (isExist) {
                state.checkedGroups.splice(state.checkedGroups.indexOf(isExist), 1)
            } else {
                state.checkedGroups.push(payload)
            }
        },
        clearCheckedGroups(state) {
            state.checkedGroups = []
        },
        setListGroupNetworkStatus: (state, { payload }: PayloadAction<ListGroupNetworkStatus>) => {
            state.listGroupNetworkStatus = payload
        },
        setDroppableId: (state, { payload }: PayloadAction<'list-groups' | 'elements' | string>) => {
            state.droppableId = payload
        }
    }
})

export const listGroupActions = listGroupSlice.actions
export default listGroupSlice.reducer