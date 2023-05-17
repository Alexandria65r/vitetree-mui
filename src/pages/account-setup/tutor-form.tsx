import React, { useState } from 'react'
import { Box, TextField, Typography, colors, styled } from '@mui/material'
import { CSS_PROPERTIES } from '../../reusable'
import { ButtonIcon, FormHeader, FormLogo, StyledButton, Textarea } from '../../reusable/styles'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { authActions } from '../../../reducers/auth-reducer/auth-reducer'
import { getAuth } from "firebase/auth";
import { useAppSelector } from '../../../store/hooks'
import { fireBaseApp } from '../_app'
import { colorScheme } from '../../theme'
import { Add } from '@mui/icons-material'
import { tutorServices } from '../../reusable/helpers'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import SelectWithCheckMarks from '../../components/form-inputs/select-with-checkmarks'
import AddService from './add-service'
import { TutorInfo, TutorServiceSchema } from '../../reusable/schemas'
import { BiTrash } from 'react-icons/bi'
import AuthAPI from '../../api-services/auth'
import { Role } from '../../reusable/interfaces'
import Randomstring from 'randomstring'

const Container = styled(Box)(({ theme }) => ({
    height: 'calc(100vh - 66px)',
    width: '80%',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down("sm")]: {
        width: '100%',
        height: 'calc(100vh - 60px)',
    }
}))

export const ServicesCol = styled(Box)(({ theme }) => ({
    position: 'relative',
    flexBasis: '50%',
    padding: 20,
    height: 200,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '96%'
    }
}))
export const FormCol = styled(Box)(({ theme }) => ({
    position: 'relative',
    flexBasis: '45%',
    padding: 20,
    backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '96%'
    }
}))


const TextInput = styled(TextField)(({ theme }) => ({

}))
const FormControl = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0'
}))



const ServiceItem = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 10px',
    margin: '10px 0',
    cursor: 'pointer',
    border: `1px solid ${colors.grey[400]}`,
    '&:hover': {
        color: colors.teal[400],
        border: `1px solid ${colors.teal[400]}`,
    },
    borderRadius: CSS_PROPERTIES.radius5,
}))



type Props = {}

export default function TutorForm({ }: Props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const signUpData = useAppSelector((state) => state.AuthReducer.user)
    const [isNext, setNext] = useState<boolean>(false)
    const role = router.query.role || []
    const selectedTutorService = useAppSelector((state) => state.AuthReducer.tutorService)
    const id = Randomstring.generate(17)
    const prepareAccountSetup = React.useCallback(() => {
        dispatch(authActions.setUserProps({
            name: 'tutorInfo',
            value: TutorInfo
        }))
    }, [role])

    React.useEffect(() => {
        prepareAccountSetup()
    }, [dispatch, role])


    function handleOnChange({ target: { value, name } }: any) {
        dispatch(authActions.setUserProps({
            name: 'tutorInfo',
            value: { ...signUpData.tutorInfo, [name]: value }
        }))
    }

    function getUserRole() {
        const role = localStorage.getItem('getting-started-role')
        if (role !== null) {
            console.log(role)
            return role as Role
        }
    }


    function completeGoogleSignup() {
        if (router.query.authProvider === 'google') {
            if (fireBaseApp) {
                const { currentUser } = getAuth(fireBaseApp)
                const splitedName: any = currentUser?.displayName?.split(' ');
                console.log(currentUser)
                dispatch(authActions.setAuhtUser({
                    firstName: splitedName[0] ?? '',
                    lastName: splitedName[1] ?? '',
                    email: currentUser?.email ?? '',
                    role: getUserRole() ?? '',
                    password: ''
                }))
            }
        }
    }

    function validateForm() {

    }

    async function handleSignUp() {
        const fullname = `${signUpData.firstName}${signUpData.lastName}`
        const tutorId = `@${fullname}`
        console.log(signUpData.tutorInfo?.services)
        try {
            const { data } = await AuthAPI.update(
                signUpData._id ?? '',
                { tutorInfo: { ...signUpData.tutorInfo, tutorId } })
            if (data.success) {
                router.replace(`/dashboard`)
            }
        } catch (error) {
            console.log('err setup')
        }
    }

    function selectTutorService(service: string) {

        if (!signUpData.tutorInfo?.services) return
        const isExist = signUpData.tutorInfo?.services.find((item) => item.label === service)
        if (isExist) {
            const services = signUpData.tutorInfo?.services.filter((item) => item.label !== isExist.label)
            dispatch(authActions.setUserProps({
                name: 'tutorInfo',
                value: { ...signUpData.tutorInfo, services }
            }))
        } else {
            const selected = tutorServices.find((serviceItem) => serviceItem.label === service);
            console.log(selected)
            if (selected?.label) {
                dispatch(authActions.setTutorService(selected))
            }

        }
    }


    function isAdded(service: string) {
        let bool = false
        if (signUpData?.tutorInfo?.services) {
            const isExist = signUpData.tutorInfo?.services.find((item) => item.label === service)
            if (isExist) {
                bool = true
            }
            return bool
        }

    }

    return (

        <Container>
            <FormCol>
                <FormLogo></FormLogo>
                <FormHeader sx={{ position: 'relative', textTransform: 'capitalize' }}>
                    {selectedTutorService.label && (
                        <ButtonIcon
                            onClick={() => dispatch(authActions.setTutorService(TutorServiceSchema))}
                            sx={{ position: 'absolute', top: -10, left: 0 }}>
                            <KeyboardBackspaceOutlinedIcon />
                        </ButtonIcon>
                    )}
                    {router.query.role} account Setup
                </FormHeader>
                {!isNext ? (<>


                    <FormControl>
                        <TextInput
                            name="collage"
                            sx={{ flex: 1 }}
                            value={signUpData?.tutorInfo?.collage}
                            onChange={handleOnChange}
                            label="Collage/University"
                            placeholder="Collage/University" />
                    </FormControl>
                    <FormControl>
                        <TextInput
                            sx={{ flex: 1 }}
                            name="qualifications"
                            value={signUpData?.tutorInfo?.qualifications}
                            onChange={handleOnChange}
                            label="Qualifications"
                            placeholder="e.g PHD in " />
                    </FormControl>
                    <FormControl>
                        <SelectWithCheckMarks error={false}
                            value={signUpData?.tutorInfo?.subjects ?? []}
                            data={["Chemestry", "Physics", "Math"]}
                            label="Subjects"
                            name="subjects"
                            handleSelectedSection={handleOnChange}
                        />
                    </FormControl>
                    <FormControl>
                        <TextInput
                            name="startYear"
                            value={signUpData?.tutorInfo?.startYear}
                            onChange={handleOnChange}
                            sx={{ flexBasis: '48%' }}
                            label="Start Year"
                            placeholder="YYYY" />
                        <TextInput
                            name="endYear"
                            value={signUpData?.tutorInfo?.endYear}
                            onChange={handleOnChange}
                            sx={{ flexBasis: '48%' }}
                            label="End Year"
                            placeholder="YYYY" />
                    </FormControl>

                    <FormControl>
                        <TextInput
                            name="yearsOfExperience"
                            value={signUpData?.tutorInfo?.yearsOfExperience}
                            onChange={handleOnChange}
                            sx={{ flex: 1 }} label="Years of experience"
                            placeholder="Years" />
                    </FormControl>
                </>) : (<>
                    {!selectedTutorService.label ? (<>
                        <Box sx={{ mt: 2 }}>
                            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
                                Add sevices you will be offering
                            </Typography>
                            {tutorServices.map((service) => (
                                <ServiceItem>
                                    <Typography sx={{ flex: 1, fontWeight: 500 }}>
                                        {service.label}
                                    </Typography>
                                    <ButtonIcon
                                        onClick={() => selectTutorService(service.label)}
                                        sx={{
                                            height: 30, width: 30,
                                            border: `1px solid ${colors.grey[400]}`,
                                            backgroundColor: 'transparent',
                                            '&:hover': {
                                                color: '#fff',
                                                border: `1px solid ${colors.teal[400]}`,
                                                backgroundColor: colors.teal[400],
                                            }
                                        }}>

                                        {isAdded(service.label) ? <BiTrash /> : <Add fontSize='small' />}
                                    </ButtonIcon>
                                </ServiceItem>

                            ))}

                            <FormControl>
                                <Textarea
                                    minRows={6}
                                    value={signUpData?.tutorInfo?.description}
                                    name="description"
                                    maxLength={300}
                                    onChange={handleOnChange}
                                    sx={{ color: 'inherit', flex: 1, borderColor: colors.grey[400] }}
                                    placeholder={`Brief description about you`} />
                            </FormControl>
                        </Box>
                    </>) :
                        <AddService />}
                </>
                )}
                {!selectedTutorService.label && (
                    <FormControl sx={{ justifyContent: isNext ? 'space-between' : 'flex-end' }}>
                        <StyledButton onClick={() => setNext(!isNext)} sx={{ flexBasis: '30%' }}>
                            {isNext ? 'Back' : 'Next'}
                        </StyledButton>
                        {isNext && (
                            <StyledButton onClick={handleSignUp} sx={{ flexBasis: '30%' }}>
                                Setup
                            </StyledButton>
                        )}
                    </FormControl>
                )}
            </FormCol>
        </Container>
    )
}