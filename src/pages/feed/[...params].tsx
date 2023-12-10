import { Box, colors, styled, useMediaQuery, useTheme } from "@mui/material"
import { mainActions } from "../../../reducers/main-reducer"
import { postActions } from "../../../reducers/post-reducer"
import { fetchPostThunk, sendTipThunk } from "../../../reducers/post-reducer/post-thunks"
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { AppSpinner } from "../../components/activity-indicators"
import PostTipsBalance from "../../components/post/send-tip-popper/post-tip-balance"
import SendTipMenu from "../../components/post/send-tip-popper/send-tip-menu"
import { TipSchema } from "../../models/post"
import { formatMoney } from "../../reusable/helpers"
import { PostSchema } from "../../reusable/schemas"
import { StyledBox, ButtonIcon, StyledButton } from "../../reusable/styles"
import { colorScheme, ThemedText } from "../../theme"
import WestIcon from '@mui/icons-material/West';
import PostItem from "./post-item"
import CloseIcon from '@mui/icons-material/Close';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import { useCallback, useEffect } from "react"
import { useRouter } from "next/router"
import Layout from "../../components/layout"



const Container = styled(Box)(({ theme }) => ({
    width: '30%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    minHeight: 300,
    transform: 'translate(-50%,-50%)',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '100vh',
        overflowY: 'auto',
        top: 0,
        left: 0,
        transform: 'unset',
    }
}))
const Wrapper = styled(Box)(({ theme }) => ({
    display: 'fle',
    flexWrap: 'wrap',
    borderRadius: 20,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        borderRadius: 0,
        display: 'block',
    }
}))

const Balance = styled(StyledBox)(() => ({
    display: 'flex',
    alignItems: 'center',
    marginTop: 0,
    height: 60,
    paddingInline: 15,
}))

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
const LeftCol = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: 10,
}))
const RightCol = styled(Box)(() => ({
    flexBasis: '50%',
    padding: 10,
}))

type Props = {

}

function CompleteSendTipAction(props: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const _theme = useTheme()
    const isMobile = useMediaQuery('(max-width:600px)')
    const user = useAppSelector((state) => state.AuthReducer.user)
    const post = useAppSelector((state) => state.PostReducer.post)
    const pageNetworkStatus = useAppSelector((state) => state.PageReducer.pageNetworkStatus)
    const [postId, ...restParams]: any = router.query.params || []
    console.log(postId)



    const loadPostDetails = useCallback(() => {
        dispatch(fetchPostThunk(postId))
    }, [postId])


    useEffect(() => {
        loadPostDetails()
    }, [postId, router.pathname])



    function handleClose() {
        dispatch(postActions.setTip(TipSchema))
        dispatch(mainActions.setModal({ component: '', postId: '' }))
        router.back()
    }

    return (
        <Layout>


            <Container>

                <Wrapper className={isMobile ? 'trans-from-left' : ''}>
                    <Head sx={{
                        display: 'none',
                        border: 0,
                         [_theme.breakpoints.down('sm')]: {
                            display: 'flex'
                        }
                    }}>
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
                        <PostItem post={post} parent='post-detail' />
                    </LeftCol>
                    <RightCol>
                        {user.accountBalance > 0 ? (<>
                            <Head sx={{ borderBottom: `1px solid ${colorScheme(_theme).greyToTertiary}` }}>
                                <ThemedText sx={{ fontSize: 17, fontWeight: 600 }}>
                                    Pick a Tip
                                </ThemedText>
                            </Head>
                            <Box sx={{
                                bgcolor: colorScheme(_theme).lightToSecondaryColor,
                                padding: 1,
                                mb: 1.6,
                                borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                            }}>
                                <SendTipMenu parent="post-detail" postId={postId} />
                            </Box>
                            <Balance sx={{ borderTopLeftRadius: !user.accountBalance ? 0 : '', borderTopRightRadius: !user.accountBalance ? 0 : '' }}>
                                <ThemedText sx={{ flex: 1, fontSize: 17, fontWeight: 600 }}>Your Balance</ThemedText>
                                <ThemedText sx={{ fontSize: 17, fontWeight: 600, color: colors.teal[500] }}>
                                    K{formatMoney(user.accountBalance ?? 0)}
                                </ThemedText>
                            </Balance>

                            <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between' }}>
                                <StyledButton
                                    onClick={handleClose}
                                    sx={{
                                        fontWeight: 600, color: colorScheme(_theme).TextColor, bgcolor: 'transparent',
                                        backgroundColor: colorScheme(_theme).lightToTertiary
                                    }}>
                                    Cancel
                                </StyledButton>

                                <StyledButton onClick={() => dispatch(sendTipThunk({ postId }))}
                                    sx={{ whiteSpace: 'nowrap', flexBasis: '50%', fontWeight: 600 }}>
                                    <StarsOutlinedIcon sx={{ mr: 1 }} />
                                    {pageNetworkStatus === 'updating' ? 'Sending..' : 'Send Tip'}
                                    <AppSpinner visible={pageNetworkStatus === 'updating'} size={20} />
                                </StyledButton>
                            </Box>
                        </>) : <PostTipsBalance postId={postId} />}
                    </RightCol>
                </Wrapper>
            </Container >
        </Layout>
    )
}




export default CompleteSendTipAction