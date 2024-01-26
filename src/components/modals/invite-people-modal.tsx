import { Modal, Box, styled, TextField, useTheme, colors } from '@mui/material'
import React, { useState } from 'react'
import { useAppSelector, useSelectedBoard, useSelectedGroup } from '../../../store/hooks'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { ThemedText, colorScheme } from '../../theme'
import { ButtonIcon, StyledButton, StyledInput, Textarea } from '../../reusable/styles'
import { workspaceActions } from '../../../reducers/workspace-reducer'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import { Add } from '@mui/icons-material'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',

    width: '40%',
    height: 600,
    borderRadius: 19,
    border: `1px solid ${colorScheme(theme).lightToTertiary}`,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        height: '100dvh',
        border: 0,
    },
    [theme.breakpoints.up("md")]: {
        width: '53%',
    },
    [theme.breakpoints.up("xl")]: {
        width: '30%',
    }
}))

const Header = styled(Box)(({ theme }) => ({
    height: 60,
    gap: 5,
    display: 'flex',
    alignItems: 'center',
    paddingInline: 10,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`,
}))
const InnerWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.up('xl')]: {

    }
}))
const FormCol = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: 10,
    [theme.breakpoints.up('xl')]: {

    }
}))
const EmailItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    width: 'fit-content',
    alignItems: 'center',
    height: 35,
    padding: 10,
    cursor: 'pointer',
    borderRadius: 29,
    border: `2px solid ${colorScheme(theme).greyToTertiary}`,
    '&:hover': {
        border: `2px solid ${colors.teal[500]}`,
    },
    [theme.breakpoints.up('xl')]: {
    }
}))

const InputWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colorScheme(theme).greyToTertiary
}))
const TextInput = styled(StyledInput)(({ theme }) => ({
    flex: 1,
    fontSize: 14,
    paddingInline: 10,
    color: colorScheme(theme).TextColor
}))

const FormControl = styled(Box)(() => ({
    marginBlock: 10
}))

const MappedEmails = styled(Box)(({ theme }) => ({
    width: '90%',
    display: 'flex',
    alignItems: 'start',
    flexWrap: 'wrap',
    gap: 10,
    height: 340,
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: 'calc(100dvh - 250px)',
    }
}))


const Footer = styled(Box)(({ theme }) => ({
    width: '100%',
    padding: 10,
    display: 'flex',
    justifyContent: 'center',
    borderTop: `1px solid ${colorScheme(theme).greyToTertiary}`,
    [theme.breakpoints.up('xl')]: {
        justifyContent: 'flex-end',
    }
}))



type Props = {}

export default function InvitePeopleModal({ }: Props) {
    const router = useRouter()
    const open = Boolean(router.query.view)
    const dispatch = useDispatch()
    const id: any = router.query.view;
    const isInvitePeopleModalOpen = useAppSelector((state) => state.WorkspaceReducer.isInvitePeopleModalOpen)
    const _theme = useTheme()
    const [email, setEmail] = useState<string>('')
    const [emailList, setEmailList] = useState<string[]>([])



    function back() {
        dispatch(workspaceActions.toggleInvitePeopleModal(false))
    }

    function removeEmail(_email: string) {
        const filltered = emailList.filter((email) => email !== _email)
        setEmailList(filltered)
    }


    return (
        <Modal
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            open={isInvitePeopleModalOpen}
            onClose={() => dispatch(workspaceActions.toggleInvitePeopleModal(false))}>
            <Container>
                <Header>
                    <GroupAddOutlinedIcon />
                    <ThemedText sx={{ flex: 1, fontSize: 18, fontWeight: 600 }}>
                        Invite People</ThemedText>
                    <ButtonIcon onClick={back}>
                        <CloseOutlinedIcon sx={{ fontSize: 26 }} />
                    </ButtonIcon>
                </Header>
                <InnerWrapper>
                    <FormCol>
                        <FormControl>
                            <ThemedText sx={{ flex: 1, fontSize: 15, mb: 1, fontWeight: 600 }}>Invite Team Members</ThemedText>
                            <InputWrapper>
                                <TextInput type='email'
                                    value={email}
                                    placeholder='Enter email address'
                                    onChange={({ target }: any) => setEmail(target.value)} />
                                <StyledButton
                                    onClick={() => {
                                        if (!email.trim()) return
                                        setEmailList([...emailList, email])
                                    }}
                                    sx={{
                                        fontSize: 13,
                                        height: 30,
                                        fontWeight: 600,
                                        color: colorScheme(_theme).TextColor,
                                        mr: 1, backgroundColor: colorScheme(_theme).lightToTertiary
                                    }}>
                                    <Add /> Add Email
                                </StyledButton>
                            </InputWrapper>
                        </FormControl>
                        <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems:'start', flexWrap: 'wrap' }}>
                            <MappedEmails>
                                {emailList.map((email) => (
                                    <EmailItem>
                                        <ThemedText sx={{ fontSize: 14, fontWeight: 600 }}>{email}</ThemedText>
                                        <ButtonIcon
                                            onClick={() => removeEmail(email)}
                                            sx={{ width: 30, height: 30, ml: .5 }}>
                                            <DeleteOutlinedIcon sx={{ fontSize: 16 }} />
                                        </ButtonIcon>
                                    </EmailItem>
                                ))}
                            </MappedEmails>
                        </FormControl>
                    </FormCol>
                    <Footer>
                        <StyledButton
                            sx={{

                                flexBasis: '30%',
                                fontSize: 14, fontWeight: 500,
                                [_theme.breakpoints.down('sm')]: { flexBasis: '100%' }
                            }}>
                            <ForwardToInboxOutlinedIcon sx={{ mr: .5, fontSize: 16 }} /> Send Invites
                        </StyledButton>
                    </Footer>
                </InnerWrapper>
            </Container>
        </Modal >
    )
}       