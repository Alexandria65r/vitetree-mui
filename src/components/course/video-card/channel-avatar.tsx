import React from 'react'
import { Image, Transformation } from 'cloudinary-react'
import { Box, styled } from '@mui/material'
import Link from 'next/link'
import { ChannelInitials } from '../../../reusable/helpers'

type Props = {
    publicId: string
    name: string,
    classes: any,
    href: string

}


const Avatar = styled(Box)(() => ({
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "#fff",
    cursor: 'pointer',
    boxShadow: 'none'
}))


function ChannelAvatar({ publicId, href, name }: Props) {
    return (
        <Link href={href}>
            <Avatar>
                {publicId ? (
                    <Image
                        cloudName="alexandriah65"
                        publicId={publicId}
                        style={{ borderRadius: '50%', width: '100%', height: '100%' }}
                    >
                        <Transformation width="60" height="60" crop="fill" />
                        <Transformation fetchFormat="auto" />
                    </Image>
                ) : (
                    <Box
                        sx={{
                            textTransform:'uppercase',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: "#fff",
                            
                        }}
                    >
                        {ChannelInitials(name)}
                    </Box>
                )}

            </Avatar>
        </Link>
    )
}

export default ChannelAvatar