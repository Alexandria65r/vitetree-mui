
import { Box, Checkbox, colors, styled } from '@mui/material'
import React, { useState } from 'react'
import { ButtonIcon, StyledInput } from '../../reusable/styles'
import { colorScheme, ElipsisText, ThemedText } from '../../theme'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { TfiAngleDown, TfiAngleUp } from 'react-icons/tfi'
import { Element } from '../../models/element';
import { useAppDispatch, useAppSelector, useElementAction, useGroupAction, useSelectedElement, useSelectedGroup } from '../../../store/hooks';
import { elementsActions } from '../../../reducers/elements-reducer';
import { mainActions } from '../../../reducers/main-reducer';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



import { useRouter } from 'next/router';
const IconButton = styled(ButtonIcon)(({ theme }) => ({
    width: 30,
    height: 30,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
}))

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    userSelect: 'none',
    // flex: 1,
    minWidth: 330,
    maxWidth: 330,
    alignItems: 'center',
    height: 40,
    paddingInline: 10,
    borderRadius: 19,
    //borderBottomLeftRadius: 0,
    borderLeft: `0px solid ${colors.grey[400]}`,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`
}))

const Input = styled(StyledInput)(({ theme }) => ({
    width: '100%',
    color: colorScheme(theme).TextColor,
    height: 30,
    paddingInline: 18,
    borderRadius: 10,
    border: `1px dashed ${colorScheme(theme).TextColor}`,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,

}))

const DeleteButton = styled(ButtonIcon)(({ theme }) => ({
    width: 35,
    height: 33,
    borderRadius: 10,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    //boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

type Props = {
    id: string;
    parent: 'main-tree' | 'element-detail'
}

export default function GroupHead({ id, parent }: Props) {
    const router = useRouter()
    const group = useSelectedGroup(id)
    const isEditting = useGroupAction({ groupId: id, action: 'edit-group-name' })
    const dispatch = useAppDispatch()
    const collapedItems = useAppSelector((state) => state.ElementsReducer.collapedItems)
    const [name, setName] = useState<string>(group?.name ?? '')
    const showElementDeleteButton = useElementAction({ action: 'show-element-delete-button', elementId: group._id })
    const isMarkParentsEnabled = useElementAction({ action: 'mark-parents' })
    console.log(group)

    function update() {
        dispatch(elementsActions.updateElement({
            id,
            update: {
                key: 'name',
                value: name
            }
        }))
        setTimeout(() => dispatch(elementsActions.clearElementAction()), 500)

    }
    return (
        <Container sx={{ borderColor: group?.color ?? '' }}>
            <IconButton sx={{ color: group?.color ?? '' }} onClick={() => dispatch(elementsActions.collapseItem(id))}>
                {collapedItems.includes(id) ? <TfiAngleDown size={16} /> : <TfiAngleUp size={16} />}
            </IconButton>
            <IconButton sx={{ color: group?.color ?? '' }} onClick={() => dispatch(elementsActions.setElementAction({
                action: 'show-element-delete-button',
                elementId: id
            }))}>
                <MoreVertOutlinedIcon />
            </IconButton>

            {isEditting ? (
                <Input
                    autoFocus
                    value={name}
                    //onBlur={update}
                    onChange={({ target }) => setName(target.value)}
                    placeholder='Name cannot be empty!'
                    sx={{ borderColor: group?.color }}
                />
            ) : (<Box sx={{ flex: 1, cursor: 'pointer' }} onClick={() => {
                if (parent === 'main-tree') {
                    router.push(`${router.asPath}?view=${group?._id}`)
                } else {
                    dispatch(elementsActions.setElementAction({
                        elementId: id,
                        action: 'edit-element'
                    }))
                }
            }}>
                <ElipsisText text={group?.name} color={group?.color ?? ''} lineClamp={1} sx={{ fontWeight: 600 }} />
            </Box>
            )}
            {isMarkParentsEnabled && (
                <Checkbox checked={false} sx={{
                    ml: .5, p: 0, color: group?.color ?? '',
                    '&.Mui-checked': {
                        color: group?.color ?? '',
                    },
                    '& .MuiSvgIcon-root': { fontSize: 23, }
                }} />
            )}
            {showElementDeleteButton && (
                <DeleteButton sx={{ color: group?.color }}
                    onClick={() => dispatch(mainActions.setModal({
                        component: 'delete-element-item',
                        itemId: group._id
                    }))}>
                    <DeleteOutlineIcon />
                </DeleteButton>
            )}
        </Container>
    )
}