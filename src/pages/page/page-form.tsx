import { Box, MenuItem, Select, TextField, colors, styled } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { pageActions } from '../../../reducers/page-reducer'
import { ThemedText, colorScheme } from '../../theme'
import { ButtonIcon, StyledButton, Textarea } from '../../reusable/styles'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { pageCartegories } from '../../reusable'
import { createPageThunk, updatePageThunk } from '../../../reducers/page-reducer/page-thunks'
import { useRouter } from 'next/router'
import Link from 'next/link'



const PageModal = styled(Box)(({ theme }) => ({
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
    borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    [theme.breakpoints.down('sm')]: {
        paddingBlock: 10,
    }
}))
const FormContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    width: '20%',
    height: '100vh',
    backgroundColor: '#fff',
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

export default function PageForm({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const isFormOpen = useAppSelector((state) => state.PageReducer.isFormOpen)
    const page = useAppSelector((state) => state.PageReducer.page)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const [pageId, ...params]: any = router.query.params || []
    const isUpdate = params.includes('update')

    console.log(params)

    function handleInputChange({ target }: any) {
        dispatch(pageActions.setPageData({ ...page, [target.name]: target.value }))
        console.log(target.value)
    }


    function handleClose() {
        if (pageId === 'create') {
            router.push('/find-creators/q=nothing')
        } else if (isUpdate) {
            router.back()
        } else {
            router.push(`/page/${pageId}`)
        }
    }

    function handleOnClick() {
        if (isUpdate) {
            dispatch(updatePageThunk({ pageId, target: 'other', update: { page } }))
        } else {
            dispatch(createPageThunk())
        }
    }

    if (pageId !== 'create' && !router.asPath.includes('update')) return null
    return (
        <PageModal >
            <FormContainer className='PageModal'>
                <Header>
                    <ButtonIcon onClick={handleClose}
                        sx={(theme) => ({ backgroundColor: colorScheme(theme).grayToSecondaryColor })}
                    >
                        <CloseOutlinedIcon />
                    </ButtonIcon>
                    <Link href={user?.interaction === 'job seeker' ? '/find-creators/q=nothing' : `/page/${pageId}`}>
                        <ThemedText
                            sx={{
                                ml: 2,
                                fontSize: 22,
                                fontWeight: 600,
                                flexGrow: 1, color: colors.teal[400]
                            }}>
                            Jobstrap
                        </ThemedText>

                    </Link>
                </Header>
                <Box sx={{ height: 'calc(100% - 160px)', overflowY:'auto', padding: 2 }}>
                    <ThemedText
                        sx={{
                            fontSize: 20,
                            fontWeight: 600,
                        }}>
                        Create an Employer account
                    </ThemedText>
                    <FormControl>
                        <TextInput name="name" onChange={handleInputChange} placeholder='Company name' label='Company name' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            Use the name of your business, brand or organization, or a name that helps explain your Page
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <Select fullWidth onChange={handleInputChange}
                            name='num_of_employess' defaultValue='Number of employees' >
                            <MenuItem value="Number of employees">Number of employees</MenuItem>
                            <MenuItem sx={{ textTransform: 'capitalize' }} value='1-20'>1-20</MenuItem>
                            <MenuItem sx={{ textTransform: 'capitalize' }} value='40-80'>40-80</MenuItem>
                            <MenuItem sx={{ textTransform: 'capitalize' }} value='80-160'>80-160</MenuItem>

                        </Select>
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            Enter a category that best describes you.
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <TextInput name="fullname" onChange={handleInputChange} placeholder='First and last name' label='First and last name' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            Employers Fullname
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <TextInput name="phone_number" onChange={handleInputChange} placeholder='Phone number' label='Phone number' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                           Your phone number - not available to job seekers
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <Textarea name="bio" onChange={handleInputChange} sx={{ width: '100%', borderRadius: 1 }} minRows={3} maxLength={60} placeholder='Bio' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            Tell people a little about your company.
                        </ThemedText>
                    </FormControl>
                    <FormControl>
                        <Textarea name="about" onChange={handleInputChange} sx={{ width: '100%', borderRadius: 1 }} minRows={5} placeholder='About Page' />
                        <ThemedText sx={{ fontSize: 13, my: 1, lineHeight: 1.2 }}>
                            What is this page all company.
                        </ThemedText>
                    </FormControl>
                </Box>
                <Footer>
                    <StyledButton onClick={handleOnClick} sx={{ flex: 1, fontWeight: 600 }}>
                        {isUpdate ? 'Update Account' : '  Create Account'}
                    </StyledButton>
                </Footer>
            </FormContainer>

        </PageModal>
    )
}