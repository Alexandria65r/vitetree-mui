import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Box, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, Typography, colors, styled } from '@mui/material'
import { colorScheme } from '../../theme'
import CartItemCard from '../../components/cart-item'
import { FormatMoney } from 'format-money-js'
import { Router, useRouter } from 'next/router'
import { CSS_PROPERTIES } from '../../reusable'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import TutorItem from '../../components/tutor-item'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { Avatar, ButtonIcon, SearchInput, SearchInputWrap } from '../../reusable/styles'
import InquiryForm from '../../components/inquiry-form/forum-post-form'
import SearchIcon from '@mui/icons-material/Search';
import { TutorService } from '../../reusable/interfaces'


const Container = styled(Box)(({ theme }) => ({
    maxWidth: '90%',
    margin: '20px auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {

        margin: '10px auto',
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
    borderRadius: CSS_PROPERTIES.radius5,
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
    gap: 10,
    flexBasis: '50%',
    // padding: 10,
    minHeight: 260,
    //  borderRadius: CSS_PROPERTIES.radius5,
    // backgroundColor: colorScheme(theme).secondaryColor,
    //boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        gridTemplateColumns: '1fr',
    }
}))



const TutorDetail = styled(Box)(({ theme }) => ({
    position: 'sticky',
    top: 20,
    flexBasis: '48%',
    minHeight: 260,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    [theme.breakpoints.down("sm")]: {
        flexBasis: '100%',
        margin: '10px 0',
    }
}))

const DetailHeader = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    height: 60,
    padding: '0 15px',
    [theme.breakpoints.down("sm")]: {
        padding: '0 15px 0 5px',
    }
}))
const FormContainer = styled(Box)(({ theme }) => ({
    padding: 15,
    [theme.breakpoints.down("sm")]: {

    }
}))






type Props = {}

export default function Tutors({ }: Props) {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector((state) => state.CartReducer.cartItems)
    const router = useRouter()
    const [isOpen, setOpen] = useState<boolean>(false)

    return (
        <Layout>
            <Container sx={(theme) => ({
                [theme.breakpoints.down('sm')]: {
                    display: 'block',
                    maxWidth: isOpen ? '97%' : '93%',
                }
            })}>
                <CheckoutHeader>
                    <ButtonIcon
                        sx={(theme) => ({
                            flexBasis: 45, mr: 1,
                            display: 'none',
                            backgroundColor: 'transparent',
                            [theme.breakpoints.down("sm")]: {
                                display: isOpen ? 'flex' : 'none',
                                ml: -1.5
                            }
                        })}
                        onClick={() => setOpen(false)}>
                        <KeyboardBackspaceOutlinedIcon />
                    </ButtonIcon>
                    <Typography
                        sx={(theme) => ({
                            fontSize: 25,
                            fontWeight: 600,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: 18
                            }
                        })}>
                        {isOpen ? 'Inquire Now' : 'Tutors'}
                    </Typography>


                </CheckoutHeader>



                <TutorsColumn
                    sx={(theme) => ({
                        [theme.breakpoints.down('sm')]: {
                            display: isOpen ? 'none' : 'grid'
                        }
                    })}>
                    <SearchInputWrap sx={{ flexBasis: '100%', ml: 0, my: 1 }}>
                        <SearchIcon sx={(theme) => ({
                            flexBasis: '6%',
                            ml: .5,
                            [theme.breakpoints.down("sm")]: {
                                flexBasis: '16%',
                            }
                        })} />
                        <SearchInput placeholder='Search for tutor' />
                    </SearchInputWrap>
                    {[1, 2, 3, 4].map(() => (
                        <TutorItem setOpen={setOpen} />
                    ))}
                </TutorsColumn>
                <TutorDetail sx={(theme) => ({
                    [theme.breakpoints.down('sm')]: {
                        display: isOpen ? 'block' : 'none'
                    }
                })}>
                    <DetailHeader sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Avatar sx={{ ml: 1, mr: 1.4 }}>

                        </Avatar>
                        <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 600 }}>
                            Robert Ching'ambu
                        </Typography>
                    </DetailHeader>
                    <FormContainer>
                        <InquiryForm submitHandler={() => { }} />
                    </FormContainer>
                </TutorDetail>
            </Container>
        </Layout>
    )
}





