import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, AppState } from './store'
import { getElementById } from '../reducers/elements-reducer/elements-thunks'
import { ElementAction } from '../reducers/elements-reducer'
import { ElementSchema } from '../src/models/element'



// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: any = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

export const useSelectedElement = (id: string) => {
    return useAppSelector((state) => getElementById(state, id)) || ElementSchema
}
export const useParentAndSubElementsFromSubElementId = (id: string) => {
    const subElement = useAppSelector((state) => getElementById(state, id)) ?? ElementSchema
    const parentElement = useAppSelector((state) => getElementById(state, subElement?.parentElementId ?? ''))
    return {
        subElement,
        parentElement
    }
}
export const useSelectedElementIndex = (id: string) => {
    const element = useAppSelector((state) => getElementById(state, id)) || ElementSchema
    const elements = useAppSelector((state) => state.ElementsReducer.elements)
    return {
        id: element._id,
        index: elements.indexOf(element)
    }
}
export const useParentElements = () => {
    const elements = useAppSelector((state) => state.ElementsReducer.elements)
    return elements.filter((element) => element.elementType === 'parent')
}
export const useSubElements = (parentElementId: string) => {
    const elements = useAppSelector((state) => state.ElementsReducer.elements)
    return elements.filter((element) => element.parentElementId === parentElementId)
}
export const useElementAction = (target: ElementAction) => {
    const elementAction = useAppSelector((state) => state.ElementsReducer.elementAction)
    if (!target.elementId) {
        return target.action === elementAction.action
    } else {
        return elementAction.action === target.action && elementAction.elementId === target.elementId
    }
}
