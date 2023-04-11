import React, { useEffect, useState, useCallback } from 'react'
import Layout from '../components/layout'
import { Box, ButtonBase, IconButton, InputBase, Typography, colors, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'
import { Test } from '../reusable/interfaces'
import TestAPI from '../api-services/test'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { mainActions } from '../../reducers'
import * as types from '../reusable'
import ReusablePopper from '../components/reusable-popper'
import TestCardOptions from '../components/test-card-options'
import { SearchInput, SearchInputWrap } from '../reusable/styles'
const Container = styled(Box)(({ theme }) => ({

}))

const SearchContainer = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        width: '96%',
        height: 85,
    }
}))


const MappedCards = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    display: 'grid',
    gap: 15,
    gridTemplateColumns: 'repeat(4,1fr)',
    [theme.breakpoints.down("sm")]: {
        gap: 5,
        width: '96%',
        gridTemplateColumns: 'repeat(2,1fr)',
    }
}))
const Card = styled(Box)(({ theme }) => ({
    position: 'relative',
    minHeight: 100,
    padding: 10,
    borderRadius: CSS_PROPERTIES.radius5,
    borderLeft: `5px solid ${colors.teal[400]}`,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    transition: '0.3s all',
    cursor: 'pointer',
    '&:hover': {
        transform: 'scale(1.03)'
    },
    [theme.breakpoints.down("sm")]: {
        height: 120,
    }
}))

const Button = styled(ButtonBase)(({ theme }) => ({
    flexBasis: '20%',
    justifySelf: 'flex-end',
    fontWeight: 600,
    height: 50,
    color: '#fff',
    fontSize: 16,
    borderRadius: CSS_PROPERTIES.radius5,
    backgroundColor: colors.teal[400],
    [theme.breakpoints.down("sm")]: {
        flexBasis: '25%',
        display: 'none'
    }
}))



const ButtonIcon = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    width: 60,
    height: 60,
    right: 10,
    bottom: 10,
    color: '#fff',
    borderRadius: '50%',
    backgroundColor: colors.teal[400],
    '&:focus': {
        backgroundColor: colors.teal[400],
    },
    boxShadow: `0 1px 3px 0 ${colors.teal[600]}`,
    [theme.breakpoints.up("sm")]: {
        display: 'none',
    }
}))






type Props = {}

export default function Darshboard({ }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [data, setData] = useState<Test[]>([])
    const [isFetching, setFetching] = useState<boolean>()
    const user = useAppSelector((state) => state.AuthReducer.user)






    const fetchDashboardData = useCallback(async () => {
        if (user._id) {
            setFetching(true)
            const testsList = await TestAPI.fetchMany(user._id ?? '')
            if (testsList) {
                setFetching(false)
                setData(testsList)
            }
        }
    }, [router.pathname, user, dispatch])


    useEffect(() => {
        fetchDashboardData()
    }, [router.pathname, user, dispatch])



    function handlePopper() {
        dispatch(mainActions.setPopperState({
            component: types.REUSABLE_POPPER.TestCardOptions.component,
            popperId: types.REUSABLE_POPPER.TestCardOptions.popperId,
            placement: types.REUSABLE_POPPER.TestCardOptions.placement
        }))
    }


    return (
        <Layout>
            <Container>
                <SearchContainer>
                    <SearchInputWrap>
                        <SearchIcon sx={(theme) => ({
                            flexBasis: '6%',
                            [theme.breakpoints.down("sm")]: {
                                flexBasis: '10%',
                            }
                        })} />
                        <SearchInput placeholder='Search' />
                    </SearchInputWrap>
                    <Button onClick={() => router.push('/create')}>
                        <AddIcon></AddIcon>
                        Create
                    </Button>
                </SearchContainer>

                <MappedCards>
                    {data.map((card, index) => (
                        <Card key={index}>
                            <Typography sx={{ fontWeight: 600 }}>{card.subjectOrlanguage}</Typography>
                            <Typography>{card.cartegory}</Typography>
                            <Typography sx={{ lineHeight: 1.2, fontSize: 12 }}>
                                {card.description}
                            </Typography>
                            <TestCardOptions card={card} />
                        </Card>
                    ))}
                </MappedCards>
                <ButtonIcon onClick={() => router.push('/create')}>
                    <AddIcon fontSize="medium" />
                </ButtonIcon>
            </Container>
        </Layout>
    )
}