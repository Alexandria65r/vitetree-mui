import { Box, SxProps, Theme, colors, styled, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { CSS_PROPERTIES } from '../reusable'
import { ThemedText, colorScheme } from '../theme'
import { StyledButton, StyledButtonOutlined } from '../reusable/styles'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { East } from '@mui/icons-material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';

const PageContainer = styled(Box)(({ theme }) => ({
    padding: 10,
    flexBasis: '49%',
    gridTemplateColumns: 'repeat(2,1fr)',
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0px ${theme.palette.mode === 'light' ? '#ddd' : 'transparent'}`,
    flexWrap: 'wrap',
    alignContent: 'center',
    [theme.breakpoints.down("sm")]: {

    }
}))

const PageItemBody = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: 10,
    alignItems: 'center',
    flexBasis: '100%',
    [theme.breakpoints.down("sm")]: {

    }
}))
const Description = styled(Box)(({ theme }) => ({
    marginTop: 10,
    [theme.breakpoints.down("sm")]: {

    }
}))
const ViewJobButton = styled(StyledButton)(({ theme }) => ({
    width: '60%',
    height: 45,
    fontSize: 16,
    fontWeight: 600,
    color: colorScheme(theme).TextColor,
    border: 0,
    backgroundColor: colorScheme(theme).greyToTertiary,
    borderRadius: 25,
    whiteSpace: 'nowrap',
    [theme.breakpoints.down("sm")]: {

    }
}))
const ItemFooter = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
    gap: 10,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    }
}))





type Props = {

}





export default function JobItem({ }: Props) {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const _theme = useTheme()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const isMobile = useMediaQuery('(max-width:600px)')
    const [sort, _inquiry]: any = router.query.params || []


    const avatarStyles: SxProps<Theme> | undefined = {
        height: 80, width: 80,
        [_theme.breakpoints.down('sm')]: {
            height: 80, width: 80,
        }
    }
    return (
        <PageContainer
            sx={{
                transition: '0.3s all',
            }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center', }}>

                <PageItemBody>
                    <Box>
                        <ThemedText sx={{ fontSize: 20, fontWeight: 600 }}>
                            Full Stack Engineer
                        </ThemedText>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <ThemedText sx={{ display: 'flex', alignItems: 'center', fontSize: 16, lineHeight: 1.2, fontWeight: 500 }}>
                            <PlaceOutlinedIcon sx={{ fontSize: 16, mr: .5 }} /> Remote
                        </ThemedText>
                        <ThemedText sx={{ display: 'flex', alignItems: 'center', fontSize: 16, lineHeight: 1.2, fontWeight: 500 }}>
                            <QueryBuilderOutlinedIcon sx={{ fontSize: 16, mr: .5 }} />Anytime
                        </ThemedText>
                        <ThemedText sx={{ display: 'flex', alignItems: 'center', fontSize: 16, lineHeight: 1.2, fontWeight: 500 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16, mr: .5 }} /> 40hrs/wk
                        </ThemedText>
                    </Box>
                    <Description>
                        <ThemedText sx={{ display: 'flex', alignItems: 'center', fontSize: 15, lineHeight: 1.2, fontWeight: 500 }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, error eligend
                            dolore obcaecati vero voluptatem quibusdam itaque aut voluptas odio
                            culpa minus debitis, enim, omnis consequatur repellendus ut fugiat saepe!
                        </ThemedText>
                    </Description>
                </PageItemBody>
            </Box>

            <ItemFooter>
                <ViewJobButton sx={{ flex: 1, }}>
                    <BookmarkBorderIcon fontSize='small' sx={{ mr: .3 }} />
                    Save
                </ViewJobButton>

                <ViewJobButton sx={{ flex: 1, }}>
                    <ShareOutlinedIcon fontSize='small' sx={{ mr: .3 }} />
                    Share
                </ViewJobButton>
                <Link href={`/job/jobid`}
                    style={{ flex: isMobile ? 1 : 'unset', flexBasis: !isMobile ? '60%' : 'unset', display: 'flex', justifyContent: 'center' }}>
                    <ViewJobButton sx={{ width: '100%', bgcolor: colors.teal[500], color: '#fff' }} >
                        View Job
                        <East fontSize='small' sx={{ ml: .3 }} />
                    </ViewJobButton>
                </Link>
            </ItemFooter>
        </PageContainer>
    )
}