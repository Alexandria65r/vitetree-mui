import { Box, Menu, MenuItem, styled, useTheme } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { _pickerButtons } from '../../../reusable/helpers'
import { useAppDispatch, useSelectedElement, useWorkspacePeople } from '../../../../store/hooks'
import UserAvatar from '../../user/user-avatar'
import { ThemedText } from '../../../theme'
import { updateElementThunk } from '../../../../reducers/elements-reducer/elements-thunks'


const Container = styled(Box)(({ theme }) => ({

}))
const MenuListItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 14,
    gap: 10,
    borderRadius: 10,
    borderLeft: `2px solid transparent`
}))

type Props = {
    id: string
    color: string
    size: number
}

export default function PersonPickerPopper({ id, color, size }: Props) {
    const statusButtons = _pickerButtons('tasks')
    const _theme = useTheme()
    const dispatch = useAppDispatch()
    const element = useSelectedElement(id)
    const people = useWorkspacePeople()


    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <Box {...bindTrigger(popupState)}>
                        <UserAvatar initials={element.person?.initials} avatarStyles={{ width: size, height: size,
                             fontSize: 10, border: `1px solid ${color}`,boxShadow:'none' }} />
                    </Box>
                    <Menu {...bindMenu(popupState)}
                        transformOrigin={{
                            horizontal: 'center',
                            vertical: 'top'
                        }}
                        anchorOrigin={{
                            horizontal: 'center',
                            vertical: 'bottom'
                        }}
                        slotProps={{
                            paper: {
                                style: {
                                    padding: 10,
                                    borderRadius: 10
                                }
                            }
                        }}
                    >
                        {people.map((person, index) => (
                            <MenuListItem
                                onClick={() => {
                                    dispatch(updateElementThunk({ elementId: id, update: { key: 'person', value: person } }))
                                    popupState.close()
                                }}
                                key={person?.email ?? index} sx={{ '&:hover': { borderColor: color } }}>
                                <UserAvatar initials={person.initials} avatarStyles={{
                                    fontSize: 10,
                                    width: size, height: size,
                                    border: `1px solid ${color}`,
                                    boxShadow: 'none'

                                }} />
                                <ThemedText textTransform='capitalize' fontSize={13}>{person?.username}</ThemedText>
                            </MenuListItem>
                        ))}
                    </Menu>
                </>
                )}
            </PopupState>
        </Container>
    )
}