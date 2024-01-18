import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, AppState } from './store'
import { getElementById } from '../reducers/elements-reducer/elements-thunks'
import { ElementAction } from '../reducers/elements-reducer'
import { ElementSchema } from '../src/models/element'
import { getGroupById } from '../reducers/list-group-reducer/list-group-thunks'
import { ListGroupSchema } from '../src/models/list-group'
import { GroupAction } from '../reducers/list-group-reducer'
import { getBoardById } from '../reducers/boards-reducer/boards-thunks'



// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: any = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const useSelectBoardById = (id: string) => {
    return useAppSelector((state) => getBoardById(state, id))
}
export const useSelectedWorkspace = () => {
    return useAppSelector((state) => state.WorkspaceReducer.selectedWorkspace)
}
export const useSelectedBoard = () => {
    return useAppSelector((state) => state.BoardReducer.selectedBoard)
}
export const useSelectedGroup = (id: string) => {
    return useAppSelector((state) => getGroupById(state, id)) || ListGroupSchema
}
export const useSelectedElement = (id: string) => {
    return useAppSelector((state) => getElementById(state, id)) || ElementSchema
}
export const useGroupAndElementByElementId = (id: string) => {
    const element = useAppSelector((state) => getElementById(state, id)) ?? ElementSchema
    const listGroup = useAppSelector((state) => getGroupById(state, element?.groupId ?? ''))
    return {
        element,
        listGroup
    }
}
export const useGroupColorByElementId = (id: string) => {
    const element = useAppSelector((state) => getElementById(state, id)) ?? ElementSchema
    return useAppSelector((state) => getGroupById(state, element?.groupId ?? ''))?.color ?? ''
}

export const useSelectedElementIndex = (id: string) => {
    const element = useAppSelector((state) => getElementById(state, id)) || ElementSchema
    const elements = useAppSelector((state) => state.ElementsReducer.elements)
    return {
        id: element._id,
        index: elements.indexOf(element)
    }
}
export const useListGroups = () => {
    const listGroups = useAppSelector((state) => state.ListGroupReducer.listGroups)
    return listGroups
}
export const useParentElements = () => {
    const elements = useAppSelector((state) => state.ElementsReducer.elements)
    return elements.filter((element) => element.elementType === 'list-group-element')
}
export const useGroupListElements = (groupId: string) => {
    const elements = useAppSelector((state) => state.ElementsReducer.elements)
    return elements.filter((element) => element.groupId === groupId)
}
export const useGroupAction = (target: GroupAction) => {
    const groupAction = useAppSelector((state) => state.ListGroupReducer.groupAction)
    if (!target.groupId) {
        return target.action === groupAction.action
    } else {
        return groupAction.action === target.action && groupAction.groupId === target.groupId
    }
}
export const useElementAction = (target: ElementAction) => {
    const elementAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    if (!target.elementId) {
        return target.action === elementAction.action
    } else {
        return elementAction.action === target.action && elementAction.elementId === target.elementId
    }
}
