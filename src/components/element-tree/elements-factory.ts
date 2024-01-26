import { Element } from "../../models/element";
import { ListGroup } from "../../models/list-group";
import Randomstring from "randomstring";
export type CunstomElementType = 'group-head' | 'group-footer' | 'group-item'


export type CustomElement = {
    id: string;
    type: CunstomElementType
    groupId?: string;
    groupName?: string;
    elementId?: string;
}

export const ElementsFactory = (listGroups: ListGroup[], elements: Element[]) => {
    const customElements: CustomElement[] = []
    for (let groupIndex = 0; groupIndex < listGroups.length; groupIndex++) {
        const group = listGroups[groupIndex];
        const id = Randomstring.generate(14)
        const groupElements = elements.filter((el) => el.groupId === group._id)
        customElements.push({
            
            id: group._id ?? '',
            groupName: group.name,
            type: 'group-head',
        })


        for (let elementIndex = 0; elementIndex < groupElements.length; elementIndex++) {
            const element = groupElements[elementIndex]
            customElements.push({
                id:group._id ?? '',
                type: 'group-item',
                elementId: element._id,
            })
        }
    }

    return customElements
}

/*
map els
group
 el
 el
 el
group
 el 
 el 
 el 
 */