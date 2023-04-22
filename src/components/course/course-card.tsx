import React from 'react'
import { CSS_PROPERTIES } from '../../reusable'
import { colorScheme } from '../../theme'
import { Box, Typography, colors, styled } from '@mui/material'
import { Image, Transformation } from 'cloudinary-react'
import { Avatar } from '../../reusable/styles'
import { VideoCourse } from '../../reusable/interfaces'
import Link from 'next/link'

const Card = styled(Box)(({ theme }) => ({
    position: 'relative',
    minHeight: 180,
    borderRadius: CSS_PROPERTIES.radius10,
    backgroundColor: colorScheme(theme).secondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).chatBoarderColor}`,
    transition: '0.3s all',
    cursor: 'pointer',
    // '&:hover': {
    //     transform: 'scale(1.03)'
    // },
    [theme.breakpoints.down("sm")]: {
        minHeight: 180,
    }
}))

type Props = {
    course: VideoCourse
}

export default function CourseCard({ course }: Props) {
    return (
        <Link href={`/course/${course._id}`}>


            <Card>
                <Image cloudName="alexandriah65"
                    publicId={course.imageAsset.publicId}
                    style={{
                        width: '100%',
                        borderTopRightRadius: CSS_PROPERTIES.radius10,
                        borderTopLeftRadius: CSS_PROPERTIES.radius10,
                    }}
                >
                    <Transformation width="686" height="386" crop="thumb" />
                </Image>
                <Box sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    backgroundColor: theme.palette.mode === 'light' ? colors.grey[200] : colorScheme(theme).chatSecondaryColor,
                    padding: 2,
                    borderRadius: '10px',
                })}>

                    <Avatar>

                    </Avatar>

                    <Typography sx={(theme) => ({
                        flex: 1,
                        ml: 1,
                        lineHeight: 1.2,
                        fontSize: 13,
                        fontWeight: 600,
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        [theme.breakpoints.down("sm")]: {
                            fontWeight: 600,
                            fontSize: 16,
                        }
                    })}>{course.title}</Typography>
                </Box>
            </Card>
        </Link>
    )
}