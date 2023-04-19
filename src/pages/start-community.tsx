import React from 'react'
import { styled, TextField, Button, MenuItem, Box, Select } from '@mui/material'
import Layout from '../components/layout'
import { Container, CustomFormControl, Hero, Textarea } from '../reusable/styles'
import PeopleIcon from '@mui/icons-material/People'
import { cartegories } from '../reusable/helpers'
const PageContainer = styled(Container)(({ theme }) => ({
    width: '60%'
}))
const FormContainer = styled(Container)(({ theme }) => ({
    marginTop: 50,
    [theme.breakpoints.down('sm')]: {
        width: '90%',
        margin: '30px auto'
    }
}))
const TextInput = styled(TextField)(({ theme }) => ({

}))

const CreateCommunityButton = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    height: 45,
    borderRadius: 5,
    width: '40%',
    justifySelf:'right',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}))

type Props = {}

export default function StartCommunity({ }: Props) {
    return (
        <Layout>
            <PageContainer>
                <Hero></Hero>
                <FormContainer>
                    <CustomFormControl>
                        <TextInput sx={{flex:1}} variant='standard' placeholder='Community name' label="Community name" />
                    </CustomFormControl>
                    <CustomFormControl sx={{ mt: 5 }}>
                        <Select sx={{ flex: 1 }} variant='standard' label='Choose cartegory'>
                            <MenuItem value="Choose cartegory">Choose cartegory</MenuItem>
                            {cartegories.map((cart) => (
                                <MenuItem key={cart} value={cart}>{cart}</MenuItem>
                            ))}
                        </Select>
                    </CustomFormControl>
                    <CustomFormControl sx={{ mt: 5 }}>
                        <Textarea sx={{ flex: 1 }} minRows={3} placeholder='Description' />
                    </CustomFormControl>
                    <Box sx={{width:'100%',display:'grid',gridTemplateColumns:'1fr', my: 5 }}>
                        <CreateCommunityButton startIcon={<PeopleIcon/>}  variant='contained'>Create community</CreateCommunityButton>
                    </Box>
                </FormContainer> 
            </PageContainer>
        </Layout>
    )
}