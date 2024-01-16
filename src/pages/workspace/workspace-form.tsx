import { Box, MenuItem, Select, TextField, colors, styled } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { workspaceActions } from '../../../reducers/workspace-reducer'
import { ThemedText, colorScheme } from '../../theme'
import { ButtonIcon, StyledButton, Textarea } from '../../reusable/styles'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useRouter } from 'next/router'
import Link from 'next/link'
import { updateWorkspaceThunk, createWorkspaceThunk } from '../../../reducers/workspace-reducer/workspace-thunks'
import { workspaceCartegories } from '../../reusable/helpers'



const WorkspaceModal = styled(Box)(({ theme }) => ({
    position: 'fixed',
    width: '100%',
    height: '100vh',
    display: 'flex',
    left: 0,
    top: 0,
    zIndex: 200,
    backgroundColor: '#0000000f'
}))
const Header = styled(Box)(({ theme }) => ({
    flex: 2,
    flexBasis: '100%',
    display: 'flex',
    height: 65,
    paddingBlock: 10,
    paddingInline: 10,
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
    [theme.breakpoints.down('sm')]: {
        paddingBlock: 10,
    }
}))
const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    width: '20%',
    height: '100vh',
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    boxShadow: `0px 1px 3px 0 ${colorScheme(theme).quaternay}`,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
    [theme.breakpoints.up('md')]: {
        width: '30%',
    },
    [theme.breakpoints.up('xl')]: {
        width: '20%',
    }
}))

const TextInput = styled(TextField)(() => ({
    width: '100%'
}))
const FormControl = styled(Box)(() => ({
    marginBlock: 10
}))
const Footer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexBasis: '100%',
    alignSelf: 'flex-end',
    height: 90,
    padding: 10,
    boxShadow: `0 -1px 12px ${colorScheme(theme).quaternay}`,
    borderTop: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {
        height: 80
    }
}))


type Props = {}

export default function WorkSpaceForm({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const workspace = useAppSelector((state) => state.WorkspaceReducer.workspace)
    const isFormOpen = useAppSelector((state) => state.WorkspaceReducer.isFormOpen)
    const [workspaceId, ...params]: any = router.query.params || []
    const isUpdate = params.includes('update')

    console.log(params)

    function handleInputChange({ target }: any) {
        dispatch(workspaceActions.setWorkspaceData({ ...workspace, [target.name]: target.value }))
        console.log(target.value)
    }


    function handleClose() {
        if (workspaceId === 'create') {
            router.push('/find-creators/q=nothing')
        } else if (isUpdate) {
            router.back()
        } else {
            router.push(`/workspace/${workspaceId}`)
        }
    }

    function handleOnClick() {
        if (isUpdate) {
            dispatch(updateWorkspaceThunk({ workspaceId, target: 'other', update: { workspace } }))
        } else {
            dispatch(createWorkspaceThunk())
        }
    }

    if (!isFormOpen) return null
    return (
        <WorkspaceModal >
            <FormContainer className={'workspaceModalIn'}>
                <Header>
                    <ButtonIcon onClick={() => dispatch(workspaceActions.setIsFormOpen(false))}
                        sx={(theme) => ({ backgroundColor: colorScheme(theme).grayToSecondaryColor })}
                    >
                        <CloseOutlinedIcon />
                    </ButtonIcon>
                    <Link href={`/workspace/${workspaceId}`}>
                        <ThemedText
                            sx={{
                                ml: 2,
                                fontSize: 22,
                                fontWeight: 600,
                                flexGrow: 1, color: colors.teal[400]
                            }}>
                            Vitetree
                        </ThemedText>

                    </Link>
                </Header>
                <Box sx={{ height: 'calc(100% - 160px)', padding: 2 }}>
                    <ThemedText
                        sx={{
                            fontSize: 20,
                            fontWeight: 600,
                        }}>
                        Create a Workspace
                    </ThemedText>
                    <FormControl>
                        <TextInput name="name" onChange={handleInputChange} placeholder='Workspace name' label='Workspace name' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            Use the name of your business, brand or organization, or a name that helps explain your Workspace
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <Select fullWidth onChange={handleInputChange}
                            name='cartegory' defaultValue='Select cartegory' >
                            <MenuItem value="Select cartegory">Select cartegory</MenuItem>
                            {workspaceCartegories.map((cartegory) => (
                                <MenuItem key={cartegory} sx={{ textTransform: 'capitalize' }} value={cartegory}>{cartegory}</MenuItem>
                            ))}
                        </Select>
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            Enter a category that best describes you.
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <Textarea name="bio" onChange={handleInputChange} sx={{ width: '100%', borderRadius: 1 }} minRows={3} maxLength={60} placeholder='Bio' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            Tell people a little about what you do.
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <Textarea name="about" onChange={handleInputChange} sx={{ width: '100%', borderRadius: 1 }} minRows={5} placeholder='About Workspace' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            What is this workspace all about.
                        </ThemedText>
                    </FormControl>
                </Box>
                <Footer>
                    <StyledButton onClick={handleOnClick} sx={{ flex: 1, fontWeight: 600 }}>
                        {isUpdate ? 'Update Workspace' : '  Create Workspace'}
                    </StyledButton>
                </Footer>
            </FormContainer>

        </WorkspaceModal>
    )
}