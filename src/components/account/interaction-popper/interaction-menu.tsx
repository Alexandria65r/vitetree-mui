import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';
import { ThemedText } from '../../../theme';
import { useAppSelector } from '../../../../store/hooks';
import { Box } from '@mui/material';

type Props = {}

export default function IntractionMenu({ }: Props) {
    const user = useAppSelector((state) => state.AuthReducer.user)
    return (
        <>
            <Link href={`/page/${user?.pageInfo?.pageId}`}>
                <MenuItem sx={{ display: 'block' }}>
                    <Box>{user?.pageInfo?.name}</Box>
                    <ThemedText sx={{ fontSize: 13, color: 'GrayText' }}>Creator</ThemedText>
                </MenuItem>
            </Link>
            <Link href={`/find-creators/q=nothing`}>
                <MenuItem sx={{ display: 'block' }}>
                    <ThemedText>{`${user.firstName} ${user.lastName}`}</ThemedText>
                    <ThemedText sx={{ fontSize: 13, color: 'GrayText' }}>Member</ThemedText>
                </MenuItem>
            </Link>
        </>
    )
}