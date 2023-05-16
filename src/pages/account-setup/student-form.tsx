import React, { useState } from 'react'
import { Box, TextField, colors, styled } from '@mui/material'
import { CSS_PROPERTIES, SCHOOYARD_AUTH_TOKEN } from '../../reusable'
import { ButtonIcon, FormHeader, FormLogo, StyledButton, Textarea } from '../../reusable/styles'
import AuthAPI from '../../api-services/auth'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { authActions } from '../../../reducers/auth-reducer'
import cookies from 'js-cookie'
import { useAppSelector } from '../../../store/hooks'
import { colorScheme } from '../../theme'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import SelectWithCheckMarks from '../../components/form-inputs/select-with-checkmarks'
import { StudentInfo } from '../../reusable/schemas'
import { User } from '../../database/schema'

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



type Props = {}

export default function TutorForm({ }: Props) {
    const dispatch = useDispatch()
    const router = useRouter()
    const signUpData = useAppSelector((state) => state.AuthReducer.user)
    const [isNext, setNext] = useState<boolean>(false)
    const [selectedService, setSelectedService] = useState<string>('')
    const role = router.query.role || []

    const prepareAccountSetup = React.useCallback(() => {
        dispatch(authActions.setUserProps({
            name: 'studentInfo',
            value: StudentInfo
        }))
    }, [role])


    React.useEffect(() => {
        console.log('called student form')
        prepareAccountSetup()
    }, [])

    function handleOnChange({ target: { value, name } }: any) {
        dispatch(authActions.setUserProps({
            name: 'studentInfo',
            value: { ...signUpData.studentInfo, [name]: value }
        }))
    }

    function getUserRole() {
        const role = localStorage.getItem('getting-started-role')
        if (role !== null) {
            console.log(role)
            return role
        }
    }




    async function handleSignUp() {
        console.log(signUpData.studentInfo)
        const fullname = `${signUpData.firstName}${signUpData.lastName}`
        const studentId = `@${fullname}`
        console.log(studentId)
        try {
            const { data } = await AuthAPI.update(
                signUpData._id ?? '',
                { studentInfo: { ...signUpData.studentInfo, studentId } })
            if (data.success) {
                router.replace(`/dashboard`)
            }
        } catch (error) {
            console.log('err setup')
        }
    }

    return (

        <Container>
            <FormCol>
                <FormLogo></FormLogo>
                <FormHeader sx={{ position: 'relative', textTransform: 'capitalize' }}>
                    {selectedService && (
                        <ButtonIcon
                            onClick={() => setSelectedService('')}
                            sx={{ position: 'absolute', top: -10, left: 0 }}>
                            <KeyboardBackspaceOutlinedIcon />
                        </ButtonIcon>
                    )}
                    {router.query.role} account Setup
                </FormHeader>

                <FormControl>
                    <TextInput name="school" value={signUpData?.studentInfo?.school}
                        onChange={handleOnChange}
                        sx={{ flex: 1 }} label="School" placeholder="School" />
                </FormControl>

                {/* <FormControl>
                    <SelectWithCheckMarks error={false}
                        data={["Chemestry", "Physics", "Math"]}
                        label="Subjects"
                        name="subjects"
                        handleSelectedSection={handleOnChange}
                        value={signUpData.studentInfo?.subjects ?? []} />
                </FormControl> */}
                <FormControl>
                    <TextInput name="startYear"
                        value={signUpData?.studentInfo?.startYear}
                        onChange={handleOnChange}
                        sx={{ flexBasis: '48%' }}
                        label="Start Year"
                        placeholder="YYYY" />
                    <TextInput name="endYear"
                        value={signUpData?.studentInfo?.endYear}
                        onChange={handleOnChange}
                        sx={{ flexBasis: '48%' }}
                        label="End Year"
                        placeholder="YYYY" />
                </FormControl>
                <FormControl>
                    <Textarea
                        minRows={6}
                        value={signUpData?.studentInfo?.description}
                        name="description"
                        onChange={handleOnChange}
                        sx={{ color: 'inherit', flex: 1, borderColor: false ? colors.red[400] : colors.grey[400] }}
                        placeholder={`Brief about you and why you choose schooyard`} />
                </FormControl>
                <FormControl sx={{ justifyContent: isNext ? 'space-between' : 'flex-end' }}>
                    <StyledButton onClick={handleSignUp} sx={{ flexBasis: '30%' }}>
                        Setup
                    </StyledButton>
                </FormControl>
            </FormCol>
        </Container>
    )
}