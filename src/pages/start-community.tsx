import React from 'react'
import { styled, TextField, Button } from '@mui/material'
import Layout from '../components/layout'
import { Container, Hero } from '../reusable/styles'

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
                {/* <FormContainer>
                    <FormControl>
                        <TextInput variant='standard' placeholder='Community name' label="Community name" />
                    </FormControl>
                    <FormControl sx={{ mt: 5 }}>
                        <Select variant='standard' label='Choose cartegory'>
                            <MenuItem value="Choose cartegory">Choose cartegory</MenuItem>
                            {cartegories.map((cart) => (
                                <MenuItem key={cart} value={cart}>{cart}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ mt: 5 }}>
                        <Textarea minRows={3} placeholder='Description' />
                    </FormControl>
                    <Box sx={{width:'100%',display:'grid',gridTemplateColumns:'1fr', my: 5 }}>
                        <CreateCommunityButton startIcon={<PeopleIcon/>}  variant='contained'>Create community</CreateCommunityButton>
                    </Box>
                </FormContainer> */}
            </PageContainer>
        </Layout>
    )
}