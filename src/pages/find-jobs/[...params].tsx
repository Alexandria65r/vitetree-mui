import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, Typography, colors, styled, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { CSS_PROPERTIES } from '../../reusable'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import JobItem from '../../components/job-item'
import { SearchInput, SearchInputWrap, StyledButton, TabButton } from '../../reusable/styles'
import SearchIcon from '@mui/icons-material/Search';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import { pageActions } from '../../../reducers/page-reducer'
import { fetchPagesThunk } from '../../../reducers/page-reducer/page-thunks'
import { colorScheme } from '../../theme'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RenderJobDetail from '../../components/job/render-job-details'



const Container = styled(Box)(({ theme }) => ({
    width: '95%',
    margin: '20px auto',
    // display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        margin: '10px auto',
    },
    [theme.breakpoints.up("md")]: {
        width: '90%',
    },
    [theme.breakpoints.up("xl")]: {
        width: '80%',
    }
}))


const Searchbar = styled(Box)(({ theme }) => ({
    borderBottom: `1px solid ${colorScheme(theme).borderColor}`
}))
const PageTitle = styled(Box)(() => ({
    display: 'flex',
    flexWrap:'wrap',
    padding: '0 10px',
    marginBottom: 10,
}))

const JobResults = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gridTemplateColumns: '35% 60%',
    justifyContent: 'space-',
    marginTop: 20,
    gap: 20,
    flex: 1,
    minHeight: 60,
    [theme.breakpoints.down("sm")]: {
        display: 'grid',
        gridTemplateColumns: '1fr',
    }
}))
const JobsCol = styled(Box)(() => ({
    flex:1,
    display: 'grid',
    gap: 10
}))
const JobPreviewCol = styled(Box)(({theme}) => ({
    //position: 'sticky',
    flexBasis:'60%',
    top: 0,
    [theme.breakpoints.down("sm")]: {
        display: 'none'
    },
}))


const TabHeader = styled(Box)(({ theme }) => ({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    borderRadius: CSS_PROPERTIES.radius5,
    [theme.breakpoints.down('sm')]: {
        width: '94vw',
        overflowX: 'auto',

    },
    "::-webkit-scrollbar": {
        display: 'none'
    }
}))

const ViewJobButton = styled(StyledButton)(({ theme }) => ({
    width: '60%',
    height: 45,
    fontSize: 16,
    fontWeight: 600,
    color: colorScheme(theme).TextColor,
    border: 0,
    backgroundColor: colorScheme(theme).greyToTertiary,
    borderRadius: 25,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down("sm")]: {

    }
}))



type Props = {}

export default function Tutors({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const _theme = useTheme()
    const [sort, inquiry, inquiryId]: any = router.query.params || []
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)

    const loadCreators = useCallback(() => {
        dispatch(fetchPagesThunk())

    }, [router.pathname, dispatch])


    useEffect(() => {
        loadCreators()
        return () => {
            dispatch(pageActions.setPages([]))
        }
    }, [router.pathname])

    type Tab = {
        name: string;
        icon: any
    }
    const Tabs: Tab[] = [
        { name: 'all', icon: PersonSearchOutlinedIcon },
        { name: 'available', icon: CoPresentIcon },
        { name: 'favourites', icon: FavoriteBorderOutlinedIcon },
        { name: 'recently viewed', icon: ManageSearchOutlinedIcon },
    ]


    return (
        <Layout>
            <Container sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                    display: 'block',
                }
            })}>

                <Searchbar>
                    <Box sx={{
                        width: '35%', m: 'auto', my: 1,
                        [_theme.breakpoints.down('sm')]: {
                            width: '100%'
                        }
                    }}>

                        <SearchInputWrap sx={{ flexBasis: '30%', ml: 0, my: 1 }}>
                            <SearchIcon sx={(theme) => ({
                                flexBasis: '6%',
                                ml: .5,
                                [theme.breakpoints.down("sm")]: {
                                    flexBasis: '16%',
                                }
                            })} />
                            <SearchInput placeholder='Search for jobs' />
                        </SearchInputWrap>
                        <TabHeader>
                            {Tabs.map((tab) => (
                                <TabButton
                                    onClick={() => router.push(`/find-jobs/${tab.name}`)}
                                    sx={(theme) => ({
                                        textTransform: 'capitalize',
                                        border: `1px ${colorScheme(theme).greyToTertiary}`,
                                        backgroundColor: sort === tab.name ? colors.teal[400] : '',
                                        color: sort === tab.name ? '#fff' : ''
                                    })}
                                >
                                    <tab.icon fontSize='small' style={{ marginRight: '.1em' }} />
                                    {tab.name}
                                </TabButton>
                            ))}

                        </TabHeader>
                    </Box>
                </Searchbar>
                <JobResults sx={{ gridTemplateColumns: isSidebarOpen ? '28% 50%' : '35% 50%' }}>
                    <JobsCol>
                        <PageTitle>
                            <Typography
                                sx={(theme) => ({
                                    flex:1,
                                    fontSize: 22,
                                    fontWeight: 600,
                                    [theme.breakpoints.down("sm")]: {
                                        fontSize: 18
                                    }
                                })}>
                                120 React Jobs
                            </Typography>

                            <ViewJobButton sx={{flexBasis:'35%'}}>
                                <BookmarkBorderIcon fontSize='small' sx={{ mr: .3 }} />
                                Save Search
                            </ViewJobButton>
                        </PageTitle>
                        {[1, 2, 3, 4, 5, 6, 7].map((page, index) => (
                            <JobItem key={index} />
                        ))}
                    </JobsCol>
                    <JobPreviewCol>
                        <RenderJobDetail />
                    </JobPreviewCol>
                </JobResults>
            </Container>
        </Layout >
    )
}





