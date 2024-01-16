import { Box, MenuItem, colors, styled } from '@mui/material'
import React from 'react'
import { ElipsisText, colorScheme } from '../theme'
import Link from 'next/link'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';


const Container = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2,1fr)',
    gap: 10,
    [theme.breakpoints.up('xl')]: {
        gap: 15,
        gridTemplateColumns: 'repeat(5,1fr)',
    }
}))



const Card = styled(Box)(({ theme }) => ({
    flex: 1,
    minHeight: 120,
    padding: 10,
    borderRadius: 19,
    backgroundColor: colorScheme(theme).lightToprimaryColor,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`
    //boxShadow: `0 1px 3px 0 ${colorScheme(theme).darkGreyToSecondary}`
}))
const CardHead = styled(Box)(({ theme }) => ({
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    marginBottom: 5,
    //borderTopLeftRadius:19,
    // borderTopRightRadius:19,
    backgroundColor: colorScheme(theme).lightGreyToTertiary
}))
const CardBody = styled(Box)(({ theme }) => ({

}))
const CardBodyItem = styled(MenuItem)(({ theme }) => ({
    fontSize: 13,
    padding:5,
    '&:hover': {
        backgroundColor: 'transparent'
    }
}))



type Props = {}

export default function RenderBoardsAndWorkSpaces({ }: Props) {
    return (
        <Container>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((board) => (
                <Link href='/tasks/vitetree/some-id'>
                    <Card>
                        <CardHead>
                            <ElipsisText text={'Cool Workspace'} lineClamp={1} sx={{ fontSize: 16, fontWeight: 500 }} />
                        </CardHead>
                        <CardBody>
                            <CardBodyItem> <FolderOutlinedIcon sx={{ mr: 1 }} /> 20 Boards</CardBodyItem>
                            <CardBodyItem> <Groups2OutlinedIcon sx={{ mr: 1 }} /> 14 People</CardBodyItem>
                        </CardBody>
                    </Card>
                </Link>
            ))}
        </Container>
    )
}