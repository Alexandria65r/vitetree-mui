
import { Box, Checkbox, colors, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
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
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';


import { useRouter } from 'next/router';
import { listGroupActions } from '../../../reducers/list-group-reducer';
import { create } from '@mui/material/styles/createTransitions';
import NewItemInput from './new-item-input';
import { updateGroupThunk } from '../../../reducers/list-group-reducer/list-group-thunks';
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
    //borderLeft: `0px solid ${colors.grey[400]}`,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    //boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`
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
    const checkedGroups = useAppSelector((state) => state.ListGroupReducer.checkedGroups)
    const newListGroupName = useAppSelector((state) => state.ListGroupReducer.newListGroupName)
    const showElementDeleteButton = useElementAction({ action: 'show-element-delete-button', elementId: group._id })
    const isMarkParentsEnabled = useGroupAction({ action: 'mark-parents' })


    useEffect(() => {
        if (isEditting) {
            dispatch(listGroupActions.setListGroupName(group?.name ?? ''))
        }
    }, [isEditting])


    function update() {
        if (newListGroupName.trim() && group.name !== newListGroupName) {
            dispatch(updateGroupThunk({
                groupId: group?._id ?? '',
                update: {
                    key: 'name',
                    value: newListGroupName
                }
            }))
        } else {
            dispatch(listGroupActions.setListGroupName(''))
            dispatch(listGroupActions.clearGroupAction())
        }
    }


    return (
        <Container sx={{ borderColor: '' }}>
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
                <NewItemInput
                    value={newListGroupName}
                    onChange={(target) => dispatch(listGroupActions.setListGroupName(target.value))}
                    placeholder='Group name' color={group?.color ?? ''}
                    createIcon={<VerticalAlignTopIcon sx={{ color: `${group.color ?? ''}!important`, transform: 'rotate(90deg)' }} />}
                    create={update}
                    sx={{
                        paddingBlock: '6px',
                        borderBottomColor: `${group?.color}!important`,
                        border: `1px dashed ${group?.color}`,
                        borderRight: 0,
                        '&:focus': { borderBottomColor: `${group?.color}!important` }
                    }}
                    btnSx={{ height: '30px', border: `1px dashed ${group?.color}`, borderLeft: 0, boxShadow: 'none' }}
                />
            ) : (<Box sx={{ flex: 1, cursor: 'pointer' }} onClick={() => {
                dispatch(listGroupActions.setGroupAction({
                    groupId: group._id,
                    action: 'edit-group-name'
                }))
            }}>
                <ElipsisText text={group?.name} color={group?.color ?? ''} lineClamp={1} sx={{ fontWeight: 600 }} />
            </Box>
            )}
            {isMarkParentsEnabled && (
                <Checkbox checked={checkedGroups.includes(group?._id ?? '')}
                    onChange={() => dispatch(listGroupActions.checkGroup(group?._id ??''))}
                    sx={{
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
                        component: 'delete-list-group',
                        itemId: group._id
                    }))}>
                    <DeleteOutlineIcon />
                </DeleteButton>
            )}
        </Container>
    )
}