import { Box, TextField, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { ThemedText, colorScheme } from '../../../theme';
import { ButtonIcon, StyledBox, StyledButton } from '../../../reusable/styles';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { PostSchema, Tip } from '../../../models/post';
import PostItem from '../../../pages/feed/post-item';
import CloseIcon from '@mui/icons-material/Close';
import { mainActions } from '../../../../reducers/main-reducer';
import SendTipMenu from './send-tip-menu';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import WestIcon from '@mui/icons-material/West';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EditIcon from '@mui/icons-material/Edit';
import { formatMoney } from '../../../reusable/helpers';

const Container = styled(Box)(({ theme }) => ({
    width: '40%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight: 300,
    borderRadius: 20,
    transform: 'translate(-50%,-50%)',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        display: 'block',
        borderRadius: 0,
        height: '100vh',
        overflowY: 'auto',
        top: 0,
        left: 0,
        transform: 'unset',
    }
}))
const Wrapper = styled(Box)(({ theme }) => ({

    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: 20,
    backgroundColor: colorScheme(theme).grayToprimaryColor,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        display: 'block',
    }
}))



const Head = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    //justifyContent:'center',
    height: 60,
    paddingInline: 22,
    flexBasis: '100%',
    borderTopLeftRadius: 10, borderTopRightRadius: 10,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    //borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
    [theme.breakpoints.down('sm')]: {

        paddingInline: 10,
    }
}))
const LeftCol = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: 10,
    borderRight: `1px solid ${colorScheme(theme).greyToTertiary}`
}))
const RightCol = styled(Box)(({ theme }) => ({
    flexBasis: '50%',
    padding: 10,
}))
const Balance = styled(StyledBox)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 0,
    height: 60,
    paddingInline: 15,
}))
const TopupChoices = styled(StyledBox)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 0,
    marginTop: 10,
    paddingInline: 15,
}))
const TopupChoiceAmount = styled(StyledButton)(({ theme }) => ({
    fontSize: 15,
    fontWeight: 600,
    color: colorScheme(theme).TextColor,
    backgroundColor: colorScheme(theme).lightToTertiary,
    border: `1px solid ${colorScheme(theme).borderColor}`
}))

type Props = {
    postId: string
}

function CompleteSendTipAction({ postId }: Props) {
    const dispatch = useAppDispatch()
    const _theme = useTheme()
    const isMobile = useMediaQuery('(max-width:600px)')
    const user = useAppSelector((state) => state.AuthReducer.user)
    const posts = useAppSelector((state) => state.PostReducer.posts)
    const [currentTip, setCurrentTip] = useState<Tip>()
    const [balance, setBalance] = useState<number>(0)
    const [selectedAmount, setApuntSelected] = useState<number>(0)
    const [isCustomAmount, setisCustomAmount] = useState<boolean>(false)
    const post = posts.find((postItem) => postItem.postId === postId) ?? PostSchema





    function handleClose() {
        dispatch(mainActions.setModal({ component: '', postId: '' }))
    }

    return (
        <Container>

            <Wrapper className={isMobile ? 'trans-from-left' : ''}>
                <Head sx={{ border: 0 }}>
                    <ThemedText sx={{
                        fontSize: 18, fontWeight: 700,
                        [_theme.breakpoints.down('sm')]: {
                            marginLeft: 5
                        }
                    }}>
                        Support Creator
                    </ThemedText>
                    <ButtonIcon
                        onClick={handleClose}
                        sx={{
                            position: 'absolute', top: 10, right: 2,
                            [_theme.breakpoints.down('sm')]: {
                                right: 'auto',
                                top: 7,
                                left: 0
                            }
                        }}>
                        {isMobile ? <WestIcon /> : <CloseIcon />}

                    </ButtonIcon>
                </Head>
                <LeftCol >
                    <PostItem post={post} />
                </LeftCol>
                <RightCol>
                    <Head sx={{ borderBottom: `1px solid ${colorScheme(_theme).greyToTertiary}` }}>
                        <ThemedText sx={{ fontSize: 17, fontWeight: 600 }}>
                            {balance > 0 ? 'Pick a Tip' : 'Topup'}
                        </ThemedText>
                    </Head>
                    {balance > 0 && (
                        <Box sx={{
                            bgcolor: colorScheme(_theme).lightToSecondaryColor,
                            padding: 1,
                            mb: 1.6,
                            borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                        }}>
                            <SendTipMenu postId={postId} />
                        </Box>
                    )}
                    <Balance sx={{ borderTopLeftRadius: !balance ? 0 : '', borderTopRightRadius: !balance ? 0 : '' }}>
                        <ThemedText sx={{ flex: 1, fontSize: 17, fontWeight: 600 }}>Your Balance</ThemedText>
                        <ThemedText sx={{ fontSize: 17, fontWeight: 600, color: colors.teal[500] }}>K{formatMoney(balance)}</ThemedText>
                    </Balance>
                    {!balance && (
                        <TopupChoices>
                            <ThemedText sx={{ flexBasis: '100%', mb: 1.5, fontSize: 17, fontWeight: 600 }}>Pick Amount</ThemedText>
                            <TextField type='number' disabled={!isCustomAmount}
                            size='small'
                                onChange={({ target }: any) => setApuntSelected( parseInt(target.value))}
                                autoFocus={isCustomAmount} fullWidth sx={{ mb: 1.5, }}
                                placeholder='Amount' label='Amount' />

                            {[10, 20, 40, 50, 100].map((amount) => (
                                <TopupChoiceAmount onClick={() => setApuntSelected(amount)} key={amount}>K{amount}</TopupChoiceAmount>
                            ))}



                            <StyledButton onClick={() => setisCustomAmount(true)} sx={{ mt: 1.5, flexBasis: '100%', fontWeight: 600 }}>
                                <EditIcon sx={{ mr: 1 }} />   Custom Amount
                            </StyledButton>
                        </TopupChoices>

                    )}

                    <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between' }}>
                        <StyledButton
                            onClick={handleClose}
                            sx={{
                                fontWeight: 600, color: colorScheme(_theme).TextColor, bgcolor: 'transparent',
                                backgroundColor: colorScheme(_theme).lightToTertiary
                            }}>
                            Cancel
                        </StyledButton>
                        {balance > 0 ? (
                            <StyledButton sx={{ flexBasis: '50%', fontWeight: 600 }}>
                                <StarsOutlinedIcon sx={{ mr: 1 }} />   Send Tip
                            </StyledButton>
                        ) : (
                            <StyledButton onClick={() => setBalance(selectedAmount)} sx={{ flexBasis: '50%', fontWeight: 600 }}>
                                <AccountBalanceWalletIcon sx={{ mr: 1 }} />   Topup
                            </StyledButton>
                        )}

                    </Box>
                </RightCol>
            </Wrapper>
        </Container >
    )
}




export default CompleteSendTipAction