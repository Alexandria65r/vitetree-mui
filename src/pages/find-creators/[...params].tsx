import React, { useCallback, useEffect } from 'react'
import Layout from '../../components/layout'
import { Box, Typography, colors, styled } from '@mui/material'
import { colorScheme } from '../../theme'
import { useRouter } from 'next/router'
import { CSS_PROPERTIES } from '../../reusable'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import TutorItem from '../../components/tutor-item'
import { SearchInput, SearchInputWrap, TabButton } from '../../reusable/styles'
import SearchIcon from '@mui/icons-material/Search';

import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import { pageActions } from '../../../reducers/page-reducer'
import { fetchPagesThunk } from '../../../reducers/page-reducer/page-thunks'

const Container = styled(Box)(({ theme }) => ({
    width: '95%',
    margin: '20px auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        margin: '10px auto',
    },
    [theme.breakpoints.up("md")]: {
        width: '70%',
    },
    [theme.breakpoints.up("xl")]: {
        width: '35%',
    }
}))


const CheckoutHeader = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    //height: 60,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: '0 10px',
    marginBottom: 10,
    //backgroundColor: colorScheme(theme).secondaryColor,
    borderRadius: CSS_PROPERTIES.radius10,
    borderEndEndRadius: 0,
    borderBottomLeftRadius: 0,
    // boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {

    }
}))

const TutorsColumn = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    gridTemplateColumns: 'repeat(2,1fr)',
    justifyContent: 'space-between',
    marginRight: 15,
    gap: 10,
    flex: 1,
    // padding: 10,
    minHeight: 60,
    //  borderRadius: CSS_PROPERTIES.radius5,
    // backgroundColor: colorScheme(theme).secondaryColor,
    //boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        display: 'grid',
        gridTemplateColumns: '1fr',
    }
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


type Props = {}

export default function Tutors({ }: Props) {
    const dispatch =useAppDispatch()
    const router = useRouter()
    const [sort, inquiry, inquiryId]: any = router.query.params || []
    const pages = useAppSelector((state) => state.PageReducer.pages)

    const loadCreators = useCallback(() => {
        dispatch(fetchPagesThunk())

    }, [router.pathname, dispatch])


    useEffect(() => {
        loadCreators()
        return () => {
            dispatch(pageActions.setPages([]))
        }
    }, [router.pathname])


    return (
        <Layout>
            <Container sx={(theme) => ({
                // maxWidth: !isSidebarOpen ? '97%' : '90%',
                [theme.breakpoints.down('sm')]: {
                    display: 'block',
                }
            })}>
                <CheckoutHeader>
                    <Typography
                        sx={(theme) => ({
                            fontSize: 25,
                            fontWeight: 600,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: 22
                            }
                        })}>
                        Find Creators You Love
                    </Typography>
                </CheckoutHeader>

                <TutorsColumn>
                    <Box sx={{ flexBasis: '100%', ml: 0, my: 1 }}>
                        <SearchInputWrap sx={{ ml: 0, my: 1 }}>
                            <SearchIcon sx={(theme) => ({
                                flexBasis: '6%',
                                ml: .5,
                                [theme.breakpoints.down("sm")]: {
                                    flexBasis: '16%',
                                }
                            })} />
                            <SearchInput placeholder='Search for creator' />
                        </SearchInputWrap>
                        <TabHeader>
                            <TabButton
                                onClick={() => router.push(`/find-creators/all`)}
                                sx={{
                                    backgroundColor: sort === 'all' ? colors.teal[400] : '',
                                    color: sort === 'all' ? '#fff' : ''
                                }}
                            >
                                <PersonSearchOutlinedIcon fontSize='small' style={{ marginRight: '.1em' }} />
                                All
                            </TabButton>
                            <TabButton
                                onClick={() => router.push(`/find-creators/available`)}
                                sx={{
                                    backgroundColor: sort === 'available' ? colors.teal[400] : '',
                                    color: sort === 'available' ? '#fff' : ''
                                }}
                            >
                                <CoPresentIcon fontSize='small' sx={{ mr: .5 }} />
                                Available
                            </TabButton>
                            <TabButton
                                onClick={() => router.push(`/find-creators/favourites`)}
                                sx={{
                                    backgroundColor: sort === 'favourites' ? colors.teal[400] : '',
                                    color: sort === 'favourites' ? '#fff' : ''
                                }}
                            >
                                <FavoriteBorderOutlinedIcon fontSize='small' sx={{ mr: .5 }} />
                                Favourites
                            </TabButton>
                            <TabButton
                                sx={{
                                    backgroundColor: sort === 'inquired' ? colors.teal[400] : '',
                                    color: sort === 'inquired' ? '#fff' : ''
                                }}
                                onClick={() => router.push(`/find-creators/inquired`)}>
                                <ManageSearchOutlinedIcon fontSize='small' sx={{ mr: .5 }} />
                                Supported
                            </TabButton>
                        </TabHeader>
                    </Box>
                    {pages.map((page, index) => (
                        <TutorItem key={index}
                            page={page}  />
                    ))}
                </TutorsColumn>
                
            </Container>
        </Layout >
    )
}





