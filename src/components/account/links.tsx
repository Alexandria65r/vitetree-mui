import React from 'react'
import Header from './header'
import { FaGraduationCap } from 'react-icons/fa'
import { MdOutlineAddAPhoto, MdPayment } from 'react-icons/md'
import { RiContactsLine } from 'react-icons/ri'
import InfoItem from './info-item'
import { useAppSelector } from '../../../store/hooks'
import Layout from '../../components/layout'
import { Box, styled } from '@mui/material'

const Container = styled(Box)(({ theme }) => ({
    width: '70%',
    margin: 'auto',
    [theme.breakpoints.down("sm")]: {
        width: '97%'
    }
}))

type Props = {}

export default function AccountLinks({ }: Props) {
    const user = useAppSelector((state) => state.AuthReducer.user)
    const isSidebarOpen = useAppSelector((state) => state.MainReducer.isSidebarOpen)
    return (
        <Layout>
            <Container
                sx={(theme) => ({
                    width: !isSidebarOpen ? '70%' : '60%',
                    [theme.breakpoints.down("sm")]: {
                        width: '97%'
                    }
                })}
            >

                <Header />
                {/* <InfoItem
                    StartIcon={MdOutlineAddAPhoto}
                    title='Profile Photo'
                    description='Manage your profile photo'
                    routeParam='profile-photo'
                /> */}
                <InfoItem
                    StartIcon={RiContactsLine}
                    title='Primary Information'
                    description='Manage your contact Information and password'
                    route='/account/primary-info'
                />
                <InfoItem
                    StartIcon={FaGraduationCap}
                    title={`${user.role} Information`}
                    description='Manage your tutor information and availability status'
                    route='/account/role-info'
                />
                <InfoItem
                    StartIcon={MdPayment}
                    title='Billing Information'
                    description='Manage your billing Information'
                    route='/account/billing'
                />
            </Container>
        </Layout>
    )
}