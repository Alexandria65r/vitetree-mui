import { Box, Menu, styled } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { OptionButton } from '../../../reusable/styles'
import { BiColorFill } from 'react-icons/bi'
import { CirclePicker } from 'react-color'
import { colors } from '../../../reusable/helpers'
const Container = styled(Box)(({ theme }) => ({

}))

type Props = {
    color: string
    onChange: () => void
}

export default function ColorPickerPopper({ color, onChange }: Props) {
    return (
        <Container>
            <PopupState variant='popper'>
                {(popupState) => (<>
                    <OptionButton {...bindTrigger(popupState)}>
                        <BiColorFill size={16} />
                    </OptionButton>
                    <Menu {...bindMenu(popupState)}
                        transformOrigin={{
                            horizontal:'right',
                            vertical:'top'
                        }}
                        anchorOrigin={{
                            horizontal:'right',
                            vertical:'top'
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
                        <CirclePicker
                            color={color}
                            colors={colors}
                            onChange={onChange}
                            circleSize={25}
                        />
                    </Menu>
                </>
                )}
            </PopupState>
        </Container>
    )
}