
import {
    styled, Box, colors,
    ButtonBase, TextField,
    Typography, MenuItem,
    Select
}
    from '@mui/material'
import { useState, useEffect } from 'react'
import type { NextPage } from 'next'
import Layout from '../../components/layout'
import { NextRouter, useRouter } from 'next/router'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme } from '../../theme'
import { useDispatch } from 'react-redux'
import { testActions } from '../../../reducers/test-reducer'
import { useAppSelector } from '../../../store/hooks'
import { fetchTestDataThunk, prepareForPartcipant } from '../../../reducers/thunks'


const Container = styled(Box)({
    height: 'calc(100vh - 66px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

})
const IllustratorCol = styled(Box)({
    flex: 1,
    height: 'calc(100vh - 66px)',
    backgroundColor: '#fff'
})

const RightCol = styled(Box)(({ theme }) => ({
    flexBasis: '50%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    //border:'1px solid red',
    [theme.breakpoints.down('sm')]: {
        width: '70%',
    }
}))
const FrontBox = styled(Box)(({ theme }) => ({
    flexBasis: '56%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    //  border:'1px solid red',
    backgroundColor: '#fff',
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down('sm')]: {
        width: '70%',
    }
}))
const Header = styled(Box)(() => ({
    width: '100%',
    padding: 10,
    // borderBottom:'1px solid #ccc'
}))
const HeaderText = styled(Typography)(() => ({
    fontWeight: 600
}))


const CommunityButton = styled(ButtonBase)(({ theme }) => ({
    textTransform: 'capitalize',
    //flex:1,
    fontSize: 15,
    height: 45,
    borderRadius: 5,
    color: '#fff',
    backgroundColor: colors.teal[400],
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        borderRadius: 5,
        margin: '6px 0'
    }
}))
const CustomFormControl = styled(Box)(() => ({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    margin: '10px'
}))
const TextInput = styled(TextField)(() => ({


}))



const IndexPage: NextPage = () => {
    const dispatch = useDispatch()
    const router: NextRouter = useRouter()
    const id: any = router.query.id || []
    const [code, setCode] = useState<string>('')
    const [isErr, setIsError] = useState<boolean>(false)
    const participant = useAppSelector((state) => state.TestReducer.partcipant)
    const isPreparigPartcipant = useAppSelector((state) => state.TestReducer.isPreparigPartcipant)


    const fetchTestData = async () => dispatch(fetchTestDataThunk(id))

    useEffect(() => {
        fetchTestData()
    }, [])

    function handleOnChage({ target: { value, name } }: any) {
        dispatch(testActions.setPartcipant({
            ...participant,
            [name]: value
        }))
    }

    function validateForm() {
        if (!(participant.email || participant.email || participant.reason)) {
            setIsError(true)
            return true
        } else {
            setIsError(false)
            return false
        }
    }

    async function partcipateNow() {
        const error = validateForm()
        if (error || isErr) return
        const preparedData = await dispatch(prepareForPartcipant({}))
        console.log(preparedData)
    }



    async function startTest() {
        router.push(`/partcipate/${participant._id}`)
    }

    return (
        <Layout>
            <Container>
                <IllustratorCol>

                </IllustratorCol>
                <RightCol>
                    {participant?._id ? (
                        <FrontBox>
                            <Header>
                                <HeaderText>Ready</HeaderText>
                            </Header>
                            <CustomFormControl>
                                <CommunityButton sx={{ flex: 1 }} onClick={startTest}
                                    color='secondary'>
                                    Start now
                                </CommunityButton>
                            </CustomFormControl>
                        </FrontBox>
                    ) : (
                        <FrontBox>
                            <Header>
                                <HeaderText>Enter your details</HeaderText>
                            </Header>

                            <CustomFormControl
                                sx={{ flexWrap: 'wrap' }}>
                                <label style={{ flexBasis: '100%' }}>Fullname</label>
                                <TextInput size='medium' sx={{ flexBasis: '100%' }}
                                    onChange={handleOnChage}
                                    error={isErr && !participant.fullname}
                                    name="fullname"
                                    placeholder="Fullname" />
                            </CustomFormControl>

                            <CustomFormControl
                                sx={{ flexWrap: 'wrap' }}>
                                <TextInput size='medium' sx={{ flex: 1 }}
                                    error={isErr && !participant.email}
                                    onChange={handleOnChage}
                                    name="email"
                                    placeholder="Email" />
                            </CustomFormControl>
                            <CustomFormControl
                                sx={{ flexWrap: 'wrap' }}>

                                <Select fullWidth onChange={handleOnChage}
                                    error={isErr && !participant.reason}
                                    name='reason' defaultValue='Select Reason' >
                                    <MenuItem value="Select Reason">Select Reason</MenuItem>
                                    <MenuItem value="School">School</MenuItem>
                                    <MenuItem value="Survey">Survey</MenuItem>
                                </Select>
                            </CustomFormControl>
                            <CustomFormControl>
                                <CommunityButton sx={{ flex: 1 }} onClick={partcipateNow}
                                    color='secondary'>
                                    {isPreparigPartcipant ? 'Please wait...' : 'submit info'}
                                </CommunityButton>
                            </CustomFormControl>
                        </FrontBox>
                    )}
                </RightCol>
            </Container>

        </Layout>
    )
}

export default IndexPage
