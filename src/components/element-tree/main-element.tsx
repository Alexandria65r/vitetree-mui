
import { Box, colors, styled } from '@mui/material'
import React, { useState } from 'react'
import { ButtonIcon, StyledInput } from '../../reusable/styles'
import { colorScheme, ThemedText } from '../../theme'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { TfiAngleDown, TfiAngleUp } from 'react-icons/tfi'
import { Element } from '../../models/element';
import { useAppDispatch, useAppSelector, useElementAction, useSelectedElement } from '../../../store/hooks';
import { elementsActions } from '../../../reducers/elements-reducer';
import { mainActions } from '../../../reducers/main-reducer';
import { useRouter } from 'next/router';
const IconButton = styled(ButtonIcon)(({ theme }) => ({
    width: 30,
    height: 30,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
}))

const Container = styled(Box)(({ theme }) => ({
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    height: 40,
    paddingInline: 10,
    borderRadius: 19,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`
}))

const Input = styled(StyledInput)(({ theme }) => ({
    width: '100%',
    color: colorScheme(theme).TextColor,
    height: 37,
    paddingInline: 18,
    borderRadius: 19,
    border: `1px dashed ${colorScheme(theme).TextColor}`,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,

}))

type Props = {
    id: string
}

export default function MainElement({ id }: Props) {
    const router = useRouter()
    const element = useSelectedElement(id)
    const isEditting = useElementAction({ elementId: id, action: 'edit-element' })
    const dispatch = useAppDispatch()
    const collapedItems = useAppSelector((state) => state.ElementsReducer.collapedItems)
    const [name, setName] = useState<string>(element?.name ?? '')


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
        <Container>
            <IconButton onClick={() => dispatch(elementsActions.collapseItem(id))}>
                {collapedItems.includes(id) ? <TfiAngleDown size={16} /> : <TfiAngleUp size={16} />}
            </IconButton>
            <IconButton onClick={() => dispatch(elementsActions.setElementAction({
                action: 'show-element-delete-button',
                elementId: id
            }))}>
                <MoreVertOutlinedIcon />
            </IconButton>

            {isEditting ? (
                <Input
                    autoFocus
                    value={name}
                    onBlur={update}
                    onChange={({ target }) => setName(target.value)}
                    placeholder='Name cannot be empty!'
                    sx={{ borderColor: element?.color }}
                />
            ) : (<Box sx={{ cursor: 'pointer' }} onClick={() => router.push(`${router.asPath}?view=${element?._id}`)}>
                <ThemedText sx={{ whiteSpace: 'nowrap', color: element?.color }}>
                    {element?.name}
                </ThemedText>
            </Box>
            )}

        </Container>
    )
}