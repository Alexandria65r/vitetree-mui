import { Box, ButtonBase, MenuItem, Select, TextField, colors, styled } from '@mui/material'
import React, { } from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import SelectWithCheckMarks from '../form-inputs/select-with-checkmarks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { testActions } from '../../../reducers/test-reducer'
import { Section } from '../../reusable/interfaces'
import { Textarea } from '../../reusable/styles'


const ChoicesContainer = styled(Box)(({ theme }) => ({
    //marginLeft: 20,
    [theme.breakpoints.down('sm')]: {
        marginLeft: 0
    }
}))

const TextInput = styled(TextField)(({ theme }) => ({
    flex: 1
}))
const FormContainer = styled(Box)(({ theme }) => ({
    width: '80%',
    padding: 10,
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '97%'
    }
}))
const FormControl = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '20px 0'
}))


const FormControlColBadge = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    margin: 5,
    fontSize: 18,
    fontWeight: 500,
    color: '#ffff',
    borderRadius: '50%',
    backgroundColor: colors.blue[400]
}))




// const StyledButton = styled(Button)(({ theme }) => ({
//     textTransform: 'capitalize',
//     height: 45,
//     borderRadius: 5,
//     [theme.breakpoints.down('sm')]: {
//         flexBasis: '100%',
//         borderRadius: 5,
//         margin: '6px 0'
//     }
// }))





type Props = {
    mode: 'post' | "update",
    submitHandler: () => void
}

export default function ForumPostForm({ mode, submitHandler }: Props) {
    const dispatch = useAppDispatch()
    const newTest = useAppSelector((state) => state.TestReducer.newTest)
    const sections = useAppSelector((state) => state.TestReducer.sections)
    const isErr = useAppSelector((state) => state.TestReducer.isErr)
    const newPostTabValue = useAppSelector((state) => state.ForumReducer.newPostTabValue)
    const postCartegory = ['academic question', 'hire tutor']
    const cartegory = postCartegory[newPostTabValue]


    function selectCartegory({ target }: any) {
        dispatch(testActions.setNewTestProperties({
            name: target.name,
            value: target.value
        }))
    }
    function selectSectionType({ target: { name, value } }: any) {
        if (newTest.sections.length) {
            //clear existing before set
            dispatch(testActions.setNewTestProperties({
                name: 'sections',
                value: []
            }))
        }

        if (value === 'None sectioned') {
            dispatch(testActions.setNewTestProperties({
                name: 'sections',
                value: [{
                    name: value,
                    questions: [],
                    wayOfAnswering: '',
                    numberOfQuestions: 0
                }]
            }))
        }
        dispatch(testActions.setNewTestProperties({
            name,
            value
        }))
    }

    let newSections: Section[] = [...newTest.sections]
    function handleSelectedSection({ target: { name, ...rest } }: any) {
        const value: string[] = rest.value
        console.log(value)

        if (!value.length) {
            newSections = []
        }

        dispatch(testActions.setSelectedSections(value))
        if (value.length > 0 && !newSections.length) {
            console.log('called!!')
            dispatch(testActions.setNewTestProperties({
                name,
                value: [{
                    name: value[0].split(' ')[1],
                    numberOfQuestions: 0,
                    wayOfAnswering: '',
                    questions: []
                }]
            }))
        } else {
            for (let currentIndex = 0; currentIndex < newSections.length; currentIndex++) {
                const sectionName = newTest.sections[currentIndex]?.name
                for (let newIndex = 0; newIndex < value.length; newIndex++) {
                    if (value.length < newSections.length) {
                        const exists = value.find((removedSec) => removedSec === `section ${sectionName}`)
                        if (!exists) {
                            console.log(exists)
                            console.log(`section ${sectionName}`)
                            const removed = newSections.find((remo) => remo.name === sectionName)
                            if (removed) {
                                newSections.splice(newSections.indexOf(removed), 1)
                            }
                        }
                    } else {
                        if (`section ${sectionName}` !== value[newIndex]) {
                            console.log(`sections exists: ${sectionName}`)
                            const isExists = newSections.find((newSec) => newSec.name === value[newIndex].split(' ')[1])
                            console.log(isExists)
                            if (!isExists) {
                                newSections.push({
                                    name: value[newIndex].split(' ')[1],
                                    numberOfQuestions: 0,
                                    wayOfAnswering: '',
                                    questions: []
                                })
                            }
                        }
                    }
                }
            }
            dispatch(testActions.setNewTestProperties({
                name,
                value: newSections
            }))
        }


        console.log(newTest)
    }


    function handleSectionNumberOfQuestions(index: number, update: string, updateKey: 'numberOfQuestions' | 'wayOfAnswering') {
        const clonedSections = [...newTest.sections]
        const clonedSection: Section | any = { ...clonedSections[index] }
        //if (update === 'Way of answering') return

        if (updateKey === 'numberOfQuestions') {
            clonedSection[updateKey] = parseInt(update)
        } else {
            clonedSection[updateKey] = update
        }

        clonedSections[index] = clonedSection;

        dispatch(testActions.setNewTestProperties({
            name: 'sections',
            value: clonedSections
        }))
    }

    function handleOnChange({ target: { name, value } }: any) {
        dispatch(testActions.setNewTestProperties({
            name,
            value
        }))
    }


    function handleSubmit() {
        if (!(newTest.cartegory && newTest.description && newTest.subjectOrlanguage)) {
            console.log('rrr')
            dispatch(testActions.setError(true))
            return true
        } else {
            dispatch(testActions.setError(false))
            submitHandler()
            return false
        }
    }



    return (
        <FormContainer>
            <FormControl>
                <TextInput sx={{ flexBasis: '50%' }}
                    error={isErr && !newTest.subjectOrlanguage
                    }
                    value={newTest.subjectOrlanguage}
                    onChange={handleOnChange}
                    name="subjectOrlanguage"
                    label={cartegory === 'academic question' ? 'Question' : 'Title'}
                    placeholder={cartegory === 'Academic Question' ? 'Question' : 'Title'} />
            </FormControl>
            <FormControl>
                <Select fullWidth onChange={selectCartegory}
                    error={isErr && !newTest.cartegory}
                    value={newTest.cartegory || undefined}
                    name='cartegory' defaultValue='Select cartegory' >
                    <MenuItem value="Select cartegory">Select cartegory</MenuItem>
                    <MenuItem value="Stuck Question">Stuck Question</MenuItem>
                    <MenuItem value="Bid/Proposal">Bid/Proposal</MenuItem>
                </Select>
            </FormControl>

            <ChoicesContainer>





                <FormControl>
                    <Select sx={{ flex:1 }}
                        defaultValue='Way of answering'
                        error={isErr && !newTest.sections[0].wayOfAnswering}
                        onChange={({ target: { value } }) => handleSectionNumberOfQuestions(0, value, 'wayOfAnswering')}
                        //value={newTest.sections[0].wayOfAnswering || undefined}
                        name='cartegory'>
                        <MenuItem value="Way of answering">Way of answering</MenuItem>
                        <MenuItem value="multiple choice">multiple choice</MenuItem>
                        <MenuItem value="select that apply">select that apply</MenuItem>
                        <MenuItem value="word answer">word answer</MenuItem>
                    </Select>
                    {cartegory === 'hire tutor' && (
                        <TextInput
                            error={isErr && newTest.sections[0].numberOfQuestions < 1}
                            sx={{ flex:1, marginLeft: 1 }}
                            onChange={({ target: { value } }) => handleSectionNumberOfQuestions(0, value, 'numberOfQuestions')}
                            value={newTest.sections[0]?.numberOfQuestions}
                            type='number'
                            label="Budget"
                            placeholder="Budget"
                        />
                    )}
                </FormControl>

                {newTest.sectionType === 'None sectioned' && (
                    <FormControl>
                        <TextInput
                            error={isErr && newTest.sections[0].numberOfQuestions < 1}
                            sx={{ flex: 1 }}
                            onChange={({ target: { value } }) => handleSectionNumberOfQuestions(0, value, 'numberOfQuestions')}
                            value={newTest.sections[0].numberOfQuestions}
                            type='number'
                            label="Number of questions"
                            placeholder="Number of questions"
                        />

                        <Select sx={{ flexBasis: '48%', marginLeft: 1 }}
                            defaultValue='Way of answering'
                            error={isErr && !newTest.sections[0].wayOfAnswering}
                            onChange={({ target: { value } }) => handleSectionNumberOfQuestions(0, value, 'wayOfAnswering')}
                            value={newTest.sections[0].wayOfAnswering || undefined}
                            name='cartegory'>
                            <MenuItem value="Way of answering">Way of answering</MenuItem>
                            <MenuItem value="multiple choice">multiple choice</MenuItem>
                            <MenuItem value="select that apply">select that apply</MenuItem>
                            <MenuItem value="word answer">word answer</MenuItem>
                        </Select>
                    </FormControl>
                )}


                <FormControl>
                    <Textarea minRows={ 6} value={newTest.description}
                        name="description"
                        onChange={handleOnChange}
                        
                        sx={{color:'inherit', flex: 1, borderColor: isErr && !newTest.description ? colors.red[400] : colors.grey[400] }}
                        placeholder={`${newTest.cartegory} description`} />
                </FormControl>

              
            </ChoicesContainer>
        </FormContainer>
    )
}