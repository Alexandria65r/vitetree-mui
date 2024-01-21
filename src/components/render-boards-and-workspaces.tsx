import { Box, MenuItem, colors, styled } from '@mui/material'
import React from 'react'
import { ElipsisText, colorScheme } from '../theme'
import Link from 'next/link'
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import { Workspace } from '../models/workspace';


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
    padding: 5,
    '&:hover': {
        backgroundColor: 'transparent'
    }
}))



type Props = {
    workspaces: Workspace[]
}

export default function RenderBoardsAndWorkSpaces({ workspaces }: Props) {
    return (
        <Container>
            {workspaces?.map((workspace) => (
                <Link href={`/w/${workspace?._id ?? ''}`}>
                    <Card>
                        <CardHead>
                            <ElipsisText text={workspace.name} lineClamp={1} sx={{textTransform:'capitalize', fontSize: 16, fontWeight: 500 }} />
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