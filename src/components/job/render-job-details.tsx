import React from 'react'
import TopTabTabs from '../top-tab-bar'
import { ThemedText, colorScheme, useColorScheme } from '../../theme'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { Box, colors, styled } from '@mui/material';
import { StyledButton } from '../../reusable/styles';

const JobPreviewContainer = styled(Box)(({ theme }) => ({
    height: 600,
    borderRadius: 10,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    [theme.breakpoints.down('sm')]: {
        height: 'calc(100vh - 60px)',
        borderRadius: 0,
    }
}))
const JobPreviewHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: 200,
    gap: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 15,
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`
}))
const JobRecruterLogo = styled(Box)(({ theme }) => ({
    flexBasis: '20%',
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: colorScheme(theme).grayToprimaryColor,
    [theme.breakpoints.down('sm')]: {
        marginRight: 0,
        height: 140,
        flexBasis: '100%',
    }
}))
const ProfileInsights = styled(Box)(({ theme }) => ({
    padding: 10,
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`
}))
const PostDetails = styled(Box)(({ theme }) => ({
    padding: 10,
    borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`
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




type Props = {}

export default function RenderJobDetail({}: Props) {
  return (
      <JobPreviewContainer>
          <JobPreviewHeader>
              <JobRecruterLogo>

              </JobRecruterLogo>
              <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex' }}>
                      <ThemedText sx={{ flex: 1, fontSize: 22, fontWeight: 600 }}>
                          Full Stack Engineer
                      </ThemedText>
                      <ThemedText sx={{ fontSize: 14, fontWeight: 600 }}>
                          Posted Dec 20,2023
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
                  <ThemedText sx={{ fontSize: 20, my: 1, fontWeight: 600 }}>
                      Salary  $100k - $178k/yr
                  </ThemedText>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                      <ViewJobButton sx={{ flex: 1, }}>
                          <BookmarkBorderIcon fontSize='small' sx={{ mr: .3 }} />
                          Save
                      </ViewJobButton>
                      <ViewJobButton sx={{ flex: 1, }}>
                          <ShareOutlinedIcon fontSize='small' sx={{ mr: .3 }} />
                          Share
                      </ViewJobButton>
                      <ViewJobButton sx={{ width: '100%', bgcolor: colors.teal[500], color: '#fff' }} >
                          Apply Job
                          <LaunchOutlinedIcon fontSize='small' sx={{ ml: .3 }} />
                      </ViewJobButton>
                  </Box>
              </Box>
          </JobPreviewHeader>
          <ProfileInsights >
              <ThemedText sx={{ flex: 1, fontSize: 18, fontWeight: 600 }}>
                  Profile Insights
              </ThemedText>
          </ProfileInsights>

          <PostDetails>
              <ThemedText sx={{ flex: 1, fontSize: 18, fontWeight: 600 }}>
                  Post Details
              </ThemedText>
          </PostDetails>
      </JobPreviewContainer>
  )
}