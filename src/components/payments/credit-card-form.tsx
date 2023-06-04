import { Box, TextField, styled } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { StyledButton } from '../../reusable/styles'
import { authActions } from '../../../reducers/auth-reducer/auth-reducer'
import { AppSpinner } from '../activity-indicators'
import { addCardThunk } from '../../../reducers/auth-reducer/auth-thunks'


const ChoicesContainer = styled(Box)(({ theme }) => ({
    //marginLeft: 20,
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0
    }
}))

const TextInput = styled(TextField)(() => ({
    marginTop: 5
}))
const FormContainer = styled(Box)(() => ({
    width: '100%',
    padding: 10,
}))

const FormControl = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0'
}))
const Label = styled('label')(() => ({
    flexBasis: '100%',
    fontSize: 14
}))







type Props = {

}

export default function CreditCardForm({ }: Props) {
    const dispatch = useAppDispatch()
    const isErr = useAppSelector((state) => state.AuthReducer.isError)
    const card = useAppSelector((state) => state.AuthReducer.card)
    const authNetworkStatus = useAppSelector((state) => state.AuthReducer.authNetworkStatus)


    function handleOnChange({ target: { name, value } }: any) {
        dispatch(authActions.setCard({
            ...card,
            [name]: value,
        }))
    }


    function handleSubmit() {
        if (!(card.cardNumber && card.expires && card.cvc)) {
            console.log('rrr')
            dispatch(authActions.setError(true))
            return true
        } else {
            dispatch(authActions.setError(false))
            console.log(card)
            return false
        }
    }

    return (
        <FormContainer>
            <ChoicesContainer>

                <FormControl>
                    <Label sx={{ flexBasis: '100%', }}>Card number</Label>
                    <TextInput sx={{ flexBasis: '100%' }}
                        error={isErr && !card.cardNumber
                        }
                        value={card.cardNumber}
                        onChange={handleOnChange}
                        name="cardNumber"
                        label='Card number'
                        placeholder='1234 1234 1234 1234' />
                </FormControl>
                <FormControl>
                    <Box sx={{ flexBasis: '48%' }}>
                        <Label sx={{ flexBasis: '48%', }}>Expires</Label>
                        <TextInput fullWidth
                            error={isErr && !card.expires
                            }
                            value={card.expires}
                            onChange={handleOnChange}
                            name="expires"
                            label='Expiring Date'
                            placeholder='MM/YY' />
                    </Box>
                    <Box sx={{ flexBasis: '48%' }}>
                        <Label sx={{ flexBasis: '48%', }}>cvc</Label>
                        <TextInput fullWidth

                            error={isErr && !card.cvc
                            }
                            value={card.cvc}
                            onChange={handleOnChange}
                            name="cvc"
                            label='CVC'
                            placeholder='CVC' />
                    </Box>

                </FormControl>


                <FormControl onClick={handleSubmit} sx={{ justifyContent: 'flex-end' }}>
                    <StyledButton
                        onClick={() => dispatch(addCardThunk())}
                        sx={{ px: 2 }}>
                        Continue <AppSpinner size={20} visible={authNetworkStatus === 'add-card'} />
                    </StyledButton>
                </FormControl>
            </ChoicesContainer>
        </FormContainer>
    )
}