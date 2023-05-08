import { Add } from '@mui/icons-material'
import { Box, Button, MenuItem, Select, Typography, colors, styled } from '@mui/material'
import React from 'react'
import { StyledButton } from '../../reusable/styles'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { authActions } from '../../../reducers/auth-reducer'
import { TutorServiceSchema } from '../../reusable/schemas'


const FormControl = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0'
}))


type Props = {

}

export default function AddService({ }: Props) {
    const dispatch = useAppDispatch()
    const selectedTutorService = useAppSelector((state) => state.AuthReducer.tutorService)
    const tutorInfo = useAppSelector((state) => state.AuthReducer.user.tutorInfo)

    function handlePriceChange({ target: { value } }: any) {
        dispatch(authActions.setTutorService({
            ...selectedTutorService,
            price: value
        }))
    }

    function addService() {
        dispatch(authActions.setUserProps({
            name: 'tutorInfo',
            value: {
                ...tutorInfo,
                services: [...tutorInfo?.services ?? [], selectedTutorService]
            }
        }))
        dispatch(authActions.setTutorService(TutorServiceSchema))
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Typography sx={{ fontSize: 16, color: colors.teal[400], fontWeight: 600 }}>
                {selectedTutorService.label}
            </Typography>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: 'GrayText' }}>Sevices description</Typography>
            <Box sx={{ mt: 1 }}>
                <Typography sx={{ lineHeight: 1.3, color: 'GrayText' }}>
                    {selectedTutorService.description}
                </Typography>
                <FormControl>
                    <Typography sx={{ mb: .8, fontSize: 14, fontWeight: 500 }}>
                        Set pricing
                    </Typography>

                    <Select fullWidth
                        error={false}
                        value={selectedTutorService.price}
                        onChange={handlePriceChange}
                        name='price' defaultValue='Select Pricing' >
                        <MenuItem value="Select Pricing">Select Pricing</MenuItem>
                        <MenuItem value="$9.60">$9.60</MenuItem>
                        <MenuItem value="$12.60">$12.60</MenuItem>
                        <MenuItem value="$24.60">$24.60</MenuItem>
                        <MenuItem value="Free">Free</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ justifyContent: 'flex-end' }}>
                    <StyledButton
                        onClick={addService}
                        sx={{ flexBasis: '30%', height: 40 }}>
                        <Add fontSize='small' sx={{ mr: .5 }} />
                        Add
                    </StyledButton>
                </FormControl>
            </Box>
        </Box>
    )
}