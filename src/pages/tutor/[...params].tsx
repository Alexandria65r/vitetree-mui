import React from 'react'
import Layout from '../../components/layout'
import { Box, styled } from '@mui/material'
import ChatPersonInfo from '../../components/user/chat-person-info'
import { useAppSelector } from '../../../store/hooks'


const Container = styled(Box)(({ theme }) => ({
    width: '90%',
    margin: 'auto'
}))


const Header = styled(Box)(({ theme }) => ({
    marginTop:10,
}))


type Props = {}

export default function TutorProfile({ }: Props) {
    const user = useAppSelector((state) => state.AuthReducer.user)
    return (
        <Layout>
            <Container>
                <Header>
                    <ChatPersonInfo
                        userId={user?._id ?? ''}
                        fullnameStyles={{ fontSize: 30, lineHeight: 1.2, fontWeight: 600 }}
                        fullname={`${user.firstName} ${user.lastName}`}
                        avatarSize={140}
                        subText={user.email}
                        indicatorStyles={{
                            position: 'absolute',
                            left: 118,
                            bottom: 20,
                            width: 16,
                            height: 16
                        }}
                    />
                </Header>

            </Container>
        </Layout>
    )
}