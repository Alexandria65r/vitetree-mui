import React from 'react'
import Layout from '../components/layout'
import { Box, ButtonBase, IconButton, InputBase, colors, styled } from '@mui/material'
import { colorScheme } from '../theme'
import { CSS_PROPERTIES } from '../reusable'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'


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
    }
}))
const SearchInputWrap = styled(Box)(({ theme }) => ({
    flexBasis: '78%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: CSS_PROPERTIES.radius5,
    border: `1px solid ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        flex: 1
    }
}))
const SearchInput = styled(InputBase)(({ theme }) => ({
    flex: 1,
    padding: '10px 10px 10px 0',
    backgroundColor: '#fff',
    borderRadius: CSS_PROPERTIES.radius5,
}))

const MappedCards = styled(Box)(({ theme }) => ({
    width: '80%',
    margin: 'auto',
    display: 'grid',
    gap: 15,
    gridTemplateColumns: 'repeat(3,1fr)',
    [theme.breakpoints.down("sm")]: {
        width: '96%',
        gridTemplateColumns: '1fr',
    }
}))
const Card = styled(Box)(({ theme }) => ({
    height: 200,
    backgroundColor: '#fff',
    borderRadius: CSS_PROPERTIES.radius5,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    [theme.breakpoints.down("sm")]: {
        height: 260,
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
    '&:focus':{
        backgroundColor: colors.teal[400],
    },
    boxShadow:`0 1px 3px 0 ${colors.teal[600]}`,
    [theme.breakpoints.up("sm")]: {
        display: 'none',
    }
}))






type Props = {}

export default function Darshboard({ }: Props) {
    const router = useRouter()
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
                    {[1, 2, 3, 4, 5, 6].map((card, index) => (
                        <Card key={index}>

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