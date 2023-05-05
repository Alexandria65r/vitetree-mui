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
import { ButtonIcon } from '../../reusable/styles'
import InquiryForm from '../../components/inquiry-form/forum-post-form'

const Container = styled(Box)(({ theme }) => ({
    maxWidth: '90%',
    margin: '20px auto',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'start',
    justifyContent: 'space-between',
    [theme.breakpoints.down("sm")]: {
        maxWidth: '98%',
        margin: '10px auto',
    }
}))
const CheckoutHeader = styled(Box)(({ theme }) => ({
    flexBasis: '100%',
    height: 60,
    display: 'flex',
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
    display: 'grid',
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
        flexBasis: '100%',
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



const MenuItemButton = styled(MenuItem)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 600,
    margin: '5px 0',
    padding: '8px 15px',
    color: colorScheme(theme).TextColor,
    borderRadius: CSS_PROPERTIES.radius10,
    border: `1px solid ${theme.palette.mode === 'light' ? '#ddd' : colorScheme(theme).bgColor}`,
    '&:hover': {
        backgroundColor: 'transparent',
        border: `1px solid ${theme.palette.mode === 'light' ? colors.teal[400] : colorScheme(theme).bgColor}`,
    },
    [theme.breakpoints.down('sm')]: {
        padding: '10px 15px',
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
                    display: 'block'
                }
            })}>
                <CheckoutHeader>
                    <Typography
                        sx={(theme) => ({
                            fontSize: 25,
                            fontWeight: 600,
                            [theme.breakpoints.down("sm")]: {
                                fontSize: 18
                            }
                        })}>
                        Tutors
                    </Typography>
                </CheckoutHeader>
                <TutorsColumn
                    sx={(theme) => ({
                        [theme.breakpoints.down('sm')]: {
                            display: isOpen ? 'none' : 'grid'
                        }
                    })}>
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
                        <ButtonIcon
                            sx={(theme) => ({
                                flexBasis: 45, mr: 1,
                                display: 'none',
                                [theme.breakpoints.down("sm")]: {
                                    display: isOpen ? 'flex' : 'none',
                                }
                            })}
                            onClick={() => setOpen(false)}>
                            <KeyboardBackspaceOutlinedIcon />
                        </ButtonIcon>
                        <Typography sx={{ flex: 1, fontSize: 16, fontWeight: 600 }}>
                            Inquire Now
                        </Typography>
                    </DetailHeader>
                    <FormContainer>

                        <FormControl fullWidth={true}>
                            <FormLabel sx={{ fontSize: 16, fontWeight: 600, my: .5, color: colors.teal[400], }} id="demo-controlled-radio-buttons-group">
                                Select Service
                            </FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"

                            >
                                <MenuItemButton>
                                    <FormControlLabel value="class" control={<Radio sx={RadioStyles} />} label="Private class" />
                                </MenuItemButton>
                                <MenuItemButton>
                                    <FormControlLabel value="assignment" control={<Radio sx={RadioStyles} />} label="Help with assignment" />
                                </MenuItemButton>
                                <MenuItemButton>
                                    <FormControlLabel
                                        value="course"
                                        control={
                                            <Radio
                                                sx={RadioStyles} />}
                                        label="I need a Course"
                                    />
                                </MenuItemButton>
                            </RadioGroup>
                        </FormControl>
                        <InquiryForm submitHandler={() => { }} />
                    </FormContainer>
                </TutorDetail>
            </Container>
        </Layout>
    )
}

const RadioStyles = {
    color: '#ddd',
    '&.Mui-checked': {
        color: colors.teal[400]
    }
}

