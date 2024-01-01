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
    return elementAction.action === target.action && elementAction.elementId === target.elementId
}
