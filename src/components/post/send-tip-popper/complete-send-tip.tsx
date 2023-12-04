import { Box, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { ThemedText, colorScheme } from '../../../theme';
import { ButtonIcon, StyledButton } from '../../../reusable/styles';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { PostSchema, Tip } from '../../../models/post';
import PostItem from '../../../pages/feed/post-item';
import CloseIcon from '@mui/icons-material/Close';
import { mainActions } from '../../../../reducers/main-reducer';
import SendTipMenu from './send-tip-menu';
import StarsOutlinedIcon from '@mui/icons-material/StarsOutlined';
import WestIcon from '@mui/icons-material/West';



const Container = styled(Box)(({ theme }) => ({
    width: '40%',
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: 300,
    borderRadius: 20,
    transform: 'translate(-50%,-50%)',
    backgroundColor: colorScheme(theme).grayToSecondaryColor,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        display: 'block',
        borderRadius: 0,
        //padding: 10,
        height: '100vh',
        overflowY: 'auto',
        top: 0,
        left: 0,
        transform: 'unset',
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
        borderRadius: 0,
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
    const post = posts.find((postItem) => postItem.postId === postId) ?? PostSchema

    function handleClose() {
        dispatch(mainActions.setModal({ component: '', postId: '' }))
    }

    return (
        <Container>
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
                    <ThemedText sx={{ fontSize: 17, fontWeight: 600 }}>Pick a Tip</ThemedText>
                </Head>
                <Box sx={{
                    bgcolor: colorScheme(_theme).lightToSecondaryColor,
                    padding: 1,
                    borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                }}>
                    <SendTipMenu postId={postId} />
                </Box>
                <Box sx={{ display: 'flex', mt: 2, justifyContent: 'space-between' }}>
                    <StyledButton
                        sx={{
                            fontWeight: 600, color: colorScheme(_theme).TextColor, bgcolor: 'transparent',
                            backgroundColor: colorScheme(_theme).lightToTertiary
                        }}>
                        Cancel
                    </StyledButton>
                    <StyledButton sx={{ flexBasis: '50%', fontWeight: 600 }}>
                        <StarsOutlinedIcon sx={{ mr: 1 }} />   Send Tip
                    </StyledButton>
                </Box>
            </RightCol>
        </Container>
    )
}




export default CompleteSendTipAction