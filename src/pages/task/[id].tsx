import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, SxProps, Theme, Typography, styled, useTheme } from '@mui/material'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme, useColorScheme } from '../../theme'
import { useRouter } from 'next/router'
import { fetchHiredTask } from '../../../reducers/task-reducer/task-thunks'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { ActiveIndicator, Avatar, StyledBox, StyledButton, TabButton } from '../../reusable/styles'
import { Add } from '@mui/icons-material'


const Container = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down("sm")]: {
        width: '97%'
    }
}))
const Header = styled(Box)(({ theme }) => ({
    height: 66,
    display: 'flex',
    alignItems: 'center',
    paddingInline: 10,
    margin: 'auto',
    [theme.breakpoints.down("sm")]: {
        width: '97%'
    }
}))
const InnerFlexContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down("sm")]: {

    }
}))
const AsideLeft = styled(Box)(({ theme }) => ({
    flexBasis: '40%',

    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
    }
}))
const MainCol = styled(Box)(({ theme }) => ({
    flex: 1,
    marginLeft: 25,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        marginLeft: 0,
    }
}))

const MainColHeader = styled(Box)(({ theme }) => ({
    height: 40,
    padding: '0 0px',
    marginBottom: 15,
}))
const UpdateHeader = styled(Box)(({ theme }) => ({
    height: 40,
    padding: '0 10px',
}))

const TaskDetails = styled(StyledBox)(({ theme }) => ({
    minHeight: 100,
    padding: 10,
    marginBottom: 15,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor
}))
const UpdateItem = styled(StyledBox)(({ theme }) => ({
    minHeight: 100,
    padding: 10,
    marginBottom: 15,
    borderRadius: CSS_PROPERTIES.radius10,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : colorScheme(theme).secondaryColor
}))



type Props = {}

export default function Task({ }: Props) {

    const dispatch = useAppDispatch()
    const router = useRouter()
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    const user = useAppSelector((state) => state.AuthReducer.user)
    const task = useAppSelector((state) => state.TaskReducer.task)
    const id: any = router.query.id

    const _theme = useTheme()

    const loadTask = useCallback(() => {
        if (id) {
            dispatch(fetchHiredTask(id))
        }
    }, [dispatch, user, id])


    useEffect(() => {
        loadTask()
    }, [dispatch, user, id])




    return (
        <Layout>
            <Container sx={{
                width: !isSidebarOpen ? '90%' : '80%',
                [_theme.breakpoints.down("sm")]: {
                    width: '97%',
                }
            }}>
                <Header>
                    <Typography sx={{ fontSize: 25, fontWeight: 600 }}>
                        Task
                    </Typography>
                </Header>

                <InnerFlexContainer>
                    <AsideLeft>

                        <TaskDetails sx={{}}>
                            <ChatPersonInfo
                                fullname="John Doe"
                                fullnameStyles={{ fontSize: 30, lineHeight: 1.2, fontWeight: 600 }}
                                subText='Zambia - Lusaka 15:09'
                                avatarSize={100}
                                indicatorStyles={{ position: 'absolute', left: 80, bottom: 10 }} />
                            <Box sx={{ width: '100%', mt: 1, display: 'flex', flexWrap: 'wrap', rowGap: 1, justifyContent: 'space-around' }}>
                                <Typography sx={{ flexBasis: '100%', mb: 1, fontSize: 16, fontWeight: 600 }}>
                                    Assignment Solving
                                </Typography>
                                <TaskInfoItem title='Subjects' value="Math" />
                                <TaskInfoItem title='Topic' value="Trignometry" />
                                <TaskInfoItem title='Price' value="$24.60" />
                                <TaskInfoItem title='Due Date' value="5/16/2023" />
                                <StyledButton sx={{
                                    flex: 1,
                                    ml: 1,
                                    borderRadius: 29
                                    , bgcolor: _theme.palette.mode === 'light' ? '#000' : colorScheme(_theme).primaryColor
                                }}>
                                    {task.status}
                                </StyledButton>
                            </Box>
                        </TaskDetails>

                    </AsideLeft>
                    <MainCol>
                        <MainColHeader>
                            <TabButton>
                                <Add sx={{ mr: .5 }} />
                                Wirte an update
                            </TabButton>
                        </MainColHeader>
                        <UpdateItem>
                            <UpdateHeader>
                                <ChatPersonInfo
                                    fullname="(You) Robert Chingabu "
                                    fullnameStyles={{ fontSize: 14, lineHeight: 1.2, }}
                                    subText='15 Min'
                                    avatarSize={45}
                                    indicatorStyles={{ position: 'absolute', left: 30, bottom: 0 }} />
                            </UpdateHeader>
                        </UpdateItem>
                        <UpdateItem>
                            <UpdateHeader>
                                <ChatPersonInfo
                                    fullname='John Doe'
                                    fullnameStyles={{ fontSize: 14, lineHeight: 1.2, }}
                                    subText='5 Min'
                                    avatarSize={45}
                                    indicatorStyles={{ position: 'absolute', left: 30, bottom: 0 }} />
                            </UpdateHeader>
                        </UpdateItem>

                    </MainCol>
                </InnerFlexContainer>

            </Container>
        </Layout>
    )
}


type TaskInfoItemProps = {
    title: string
    value: string
}

function TaskInfoItem({ title, value }: TaskInfoItemProps) {
    const theme = useTheme()
    const _colorScheme = useColorScheme()
    return (
        <Box sx={{
            p: .6,
            flexBasis: '30%',
            border: `1px solid`,
            borderColor: theme.palette.mode === 'light' ? '#ddd' : _colorScheme.primaryColor,
            borderRadius: 29

        }}>
            <Typography sx={{ fontSize: 13, lineHeight: 1.2, textAlign: 'center' }}>{title}</Typography>
            <Typography sx={{ fontSize: 13, lineHeight: 1.2, textAlign: 'center' }}>{value}</Typography>
        </Box>
    )
}

type ChatPersonInfoProps = {
    fullname: string
    fullnameStyles?: SxProps<Theme> | undefined
    avatarSize: number
    indicatorStyles: SxProps<Theme> | undefined
    subText: string

}
function ChatPersonInfo({ fullname, fullnameStyles, subText, avatarSize, indicatorStyles }: ChatPersonInfoProps) {
    const _theme = useTheme()
    return (
        <Box sx={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
            <Avatar sx={{
                height: avatarSize, width: avatarSize,
                [_theme.breakpoints.down('sm')]: {
                    height: avatarSize, width: avatarSize,
                }
            }}>
            </Avatar>
            <ActiveIndicator sx={indicatorStyles} >

            </ActiveIndicator>
            <Box sx={{ ml: 1.5 }}>
                <Typography sx={{ flex: 1, fontWeight: 600, ...fullnameStyles, }}>
                    {fullname}
                </Typography>
                <Typography sx={{ flex: 1, fontSize: 14, color: 'GrayText', fontWeight: 500 }}>
                    {subText}
                </Typography>

            </Box>
        </Box>
    )
}


