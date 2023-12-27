import { Box, SxProps, Theme, colors, styled } from "@mui/material"
import { ThemedText, colorScheme } from "../../theme"
import { FaTiktok } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import { ButtonIcon, StyledButton } from "../../reusable/styles"
import PageTabs from "./page-tab-bar"
import IosShareIcon from '@mui/icons-material/IosShare';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EditIcon from '@mui/icons-material/Edit';
import { Page } from "../../models/page/page.model"
import { MutableRefObject, useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../../store/hooks"
import { updatePageThunk } from "../../../reducers/page-reducer/page-thunks"
import { createToastThunk } from "../../../reducers/main-reducer/main-thunks"
import DoneIcon from '@mui/icons-material/Done';
import { AppSpinner } from "../activity-indicators"
import hexToRgba from 'hex-to-rgba';
import { pageActions } from "../../../reducers/page-reducer"
import UserAvatar from "../user/user-avatar"


const Container = styled(Box)(({ theme }) => ({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {
        marginTop: 36
    }
}))
const Wrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        gap: 0,
        flexWrap: 'wrap',
    }
}))
const InfoHead = styled(Box)(({ theme }) => ({
    width: '100%',
    margin: 'auto',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
    }
}))

const AvatarWrapper = styled(Box)(({ theme }) => ({
    position:'relative',
    marginBottom:8,
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%', display: 'flex',
        justifyContent: 'center',
         marginTop: -98,
        zIndex: 30
    }
}))
const SocialLinks = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex', justifyContent: 'center',
    [theme.breakpoints.up('xl')]: {

    }
}))


type Props = {
    page: Page
    links: string[]
    path: string
    mode: 'author' | 'read-only'
    mainButton: React.ReactNode
}

export default function PageInfo({ page, links, path, mode, mainButton }: Props) {
    const dispatch = useAppDispatch()
    const [isBio, setIsBio] = useState<'editting' | 'loading' | ''>('')
    const [isLinks, setIsLinks] = useState<'editting' | 'loading' | ''>('')

    const bioRef: MutableRefObject<HTMLParagraphElement> | any = useRef()

    useEffect(() => {
        updateBioOnTextChange()
    }, [bioRef?.current?.innerText])

    function updateBioOnTextChange() {
        dispatch(pageActions.setPageData({ ...page, bio: bioRef.current.innerText }))
    }

    async function toggleUpdateBio() {
        if (!isBio) {
            setIsBio('editting')
        } else {
            setIsBio('loading')
            dispatch(pageActions.setPageData({ ...page, bio: bioRef.current.innerText }))
            const { payload } = await dispatch(updatePageThunk({
                pageId: page.pageId,
                target: 'other', update:
                    { bio: bioRef.current.innerText }
            }))
            console.log(payload)
            if (payload.success) {
                setIsBio('')
                dispatch(createToastThunk('Page bio updated successfully'))
            } else {
                dispatch(createToastThunk('Page bio not updated due to an error'))
            }
        }
    }
    async function toggleUpdateLinks() {
        if (!isLinks) {
            setIsLinks('editting')
        } else {
            setIsLinks('loading')
            const { payload } = await dispatch(updatePageThunk({
                pageId: page.pageId,
                target: 'other', update:
                    { bio: bioRef.current.innerText }
            }))
            console.log(payload)
            if (payload.success) {
                setIsLinks('')
                dispatch(createToastThunk('Page bio updated successfully'))
            } else {
                dispatch(createToastThunk('Page bio not updated due to an error'))
            }
        }
    }




    return (<Container>
        <Wrapper>
            <AvatarWrapper>
                <UserAvatar imageURL={page.imageAssets.profile.secureURL} mode={mode} avatarStyles={avatarStyles} />
            </AvatarWrapper>
            <InfoHead>
                <ThemedText sx={{ textTransform: 'capitalize', mb: 1, textAlign: 'center', fontSize: 24, fontWeight: 700 }}>
                    {page.name || 'Page Name'}
                </ThemedText>
                <Box sx={(theme) => ({
                    width: 260, position: 'relative', padding: 1,
                    border: isBio ? `1px solid ${colors.teal[500]}` : '',
                    bgcolor: mode === 'author' ? hexToRgba(`${colorScheme(theme).grayToSecondaryColor}`, isBio ? '1' : '0.3') : 'unset', borderRadius: 10,
                })}>
                    {mode === 'author' && <EditButton
                        sx={{ position: 'absolute', top: -14, right: -24, height: 30, width: 30, color: colors.teal[500] }}
                        loadingState={isBio} toggleUpdateHandler={toggleUpdateBio} />}
                    <ThemedText ref={bioRef} contentEditable={mode === 'author' && isBio === 'editting'}
                        sx={{ textAlign: 'center', outline: 'none', fontSize: 13, lineHeight: 1.2, }}>
                        {page.bio || 'Update you page bio.'}
                    </ThemedText>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
                    {mainButton}
                    <StyledButton
                        sx={(theme) => ({ fontSize: 14, bgcolor: colorScheme(theme).grayToSecondaryColor, color: colorScheme(theme).TextColor })}>
                        <IosShareIcon sx={{ mb: .8, fontSize: 18 }} /> Share
                    </StyledButton>
                </Box>
            </InfoHead>
        </Wrapper>
        <PageTabs links={links} path={path} mode={mode} />
    </Container>)
}

type EditButtonProp = {
    loadingState: 'editting' | 'loading' | ''
    toggleUpdateHandler: () => void
    sx: SxProps<Theme>
}
const EditButton = ({ loadingState, toggleUpdateHandler, sx }: EditButtonProp) => (
    <ButtonIcon onClick={toggleUpdateHandler} sx={sx}>
        {loadingState === 'loading' ? <AppSpinner visible={true} /> : loadingState === 'editting' ? <DoneIcon sx={{ fontSize: 14 }} /> : <EditIcon sx={{ fontSize: 14 }} />}
    </ButtonIcon>
)

const avatarStyles: SxProps<Theme> = (_theme) => ({
    height: 180, width: 180,
    border: `1px solid ${colorScheme(_theme).grayToSecondaryColor}`,
    [_theme.breakpoints.down('sm')]: {
        height: 80, width: 80,
    },

})