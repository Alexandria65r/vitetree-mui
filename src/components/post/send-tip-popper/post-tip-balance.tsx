import { Box, TextField, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { ThemedText, colorScheme } from '../../../theme';
import { StyledBox, StyledButton } from '../../../reusable/styles';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { mainActions } from '../../../../reducers/main-reducer';
import EditIcon from '@mui/icons-material/Edit';
import { formatMoney } from '../../../reusable/helpers';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { topupAccountThunk, updateUserThunk } from '../../../../reducers/auth-reducer/auth-thunks';
import { AppSpinner } from '../../activity-indicators';




const Head = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',

    height: 60,
    paddingInline: 22,
    flexBasis: '100%',
    borderTopLeftRadius: 10, borderTopRightRadius: 10,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    [theme.breakpoints.down('sm')]: {

        paddingInline: 10,
    }
}))
const Balance = styled(StyledBox)(() => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 0,
    height: 60,
    paddingInline: 15,
}))
const TopupChoices = styled(StyledBox)(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 0,
    marginTop: 10,
    paddingInline: 15,
}))
const TopupChoiceAmount = styled(StyledButton)(({ theme }) => ({
    fontSize: 14,
    fontWeight: 500,
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).lightToTertiary,
    border: `1px solid ${colorScheme(theme).borderColor}`
}))

type Props = {
    postId: string
}

function PostTipsBalance({ postId }: Props) {
    const dispatch = useAppDispatch()
    const _theme = useTheme()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const authNetworkStatus = useAppSelector((state) => state.AuthReducer.authNetworkStatus)
    const posts = useAppSelector((state) => state.PostReducer.posts)
    const [selectedAmount, setApuntSelected] = useState<number>(0)
    const [isCustomAmount, setisCustomAmount] = useState<boolean>(false)
    const [isErr, serError] = useState<boolean>(false)

    function handleClose() {
        dispatch(mainActions.setModal({ component: '', postId: '' }))
    }

    function TopupBalance() {
        if (selectedAmount) {
            serError(false)
            dispatch(topupAccountThunk(selectedAmount))
        } else {
            serError(true)
        }
    }

    return (
        <>
            <Head sx={{ borderBottom: `1px solid ${colorScheme(_theme).greyToTertiary}` }}>
                <ThemedText sx={{ fontSize: 17, fontWeight: 600 }}>
                    Topup
                </ThemedText>
            </Head>

            <Balance sx={{ borderTopLeftRadius: !user.accountBalance ? 0 : '', borderTopRightRadius: !user.accountBalance ? 0 : '' }}>
                <ThemedText sx={{ flex: 1, fontSize: 17, fontWeight: 600 }}>Your Balance</ThemedText>
                <ThemedText sx={{ fontSize: 17, fontWeight: 600, color: colors.teal[500] }}>
                    K{formatMoney(user.accountBalance ?? 0)}
                </ThemedText>
            </Balance>
            {!user.accountBalance && (<>
                <TopupChoices>
                    <ThemedText sx={{ flexBasis: '100%', mb: 1.5, fontSize: 17, fontWeight: 600 }}>Pick Amount</ThemedText>
                    <TextField error={isErr} type='number' disabled={!isCustomAmount}
                        size='small'
                        onChange={({ target }: any) => {
                            serError(false)
                            setApuntSelected(parseInt(target.value))
                        }}
                        autoFocus={isCustomAmount} fullWidth sx={{ mb: 1.5, }}
                        placeholder='Amount' label='Amount' />

                    {[10, 20, 40, 50, 100].map((amount) => (
                        <TopupChoiceAmount
                            sx={{
                                borderColor: selectedAmount === amount ? colors.teal[500] : '',
                                bgcolor: selectedAmount === amount ? colors.teal[500] : '',
                                color: selectedAmount === amount ? colors.common.white : ''
                            }}
                            onClick={() => {
                                setApuntSelected(amount)
                                setisCustomAmount(false)
                            }} key={amount}>
                            K{amount}
                        </TopupChoiceAmount>
                    ))}

                    <StyledButton onClick={() => setisCustomAmount(true)} sx={{ mt: 1.5, flexBasis: '100%', fontWeight: 600 }}>
                        <EditIcon sx={{ mr: 1 }} /> Custom Amount
                    </StyledButton>
                </TopupChoices>
                <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between' }}>
                    <StyledButton
                        onClick={handleClose}
                        sx={{
                            fontWeight: 600, color: colorScheme(_theme).TextColor, bgcolor: 'transparent',
                            backgroundColor: colorScheme(_theme).lightToTertiary
                        }}>
                        Cancel
                    </StyledButton>

                    <StyledButton onClick={TopupBalance} sx={{ flexBasis: '50%', fontWeight: 600 }}>
                        {authNetworkStatus === 'topup-account' ? <AppSpinner visible={true} size={20} />
                            :
                            <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                        }   Topup
                    </StyledButton>
                </Box>
            </>
            )}

        </ >
    )
}




export default PostTipsBalance