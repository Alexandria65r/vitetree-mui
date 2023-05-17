
import { Box, Typography, styled } from '@mui/material'
import React, { useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { ActiveIndicator, Avatar as AvatarContainer, ButtonIcon } from '../../reusable/styles'
import ChatPersonInfo from '../user/chat-person-info'
import UploadAPI from '../../api-services/upload'
import { authActions } from '../../../reducers/auth-reducer/auth-reducer'
import { updateUserThunk } from '../../../reducers/auth-reducer/auth-thunks'


const TopHeader = styled(Box)(() => ({
    height: 180,
    display: 'flex',
    alignItems: 'center',
    //backgroundColor:'#ddd'
}))
const Avatar = styled(AvatarContainer)(({ theme }) => ({
    width: 140,
    height: 140,
    [theme.breakpoints.down("sm")]: {
        width: 120,
        height: 120,
    }

}))
const UsernameColumn = styled(Box)(({ theme }) => ({
    position: 'relative',
    margin: '-15px 0 0 15px',
    [theme.breakpoints.down("sm")]: {
        margin: '0px 0 0 15px',
    }
}))


type Props = {
    height?: number
}

export default function Header({ height }: Props) {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.AuthReducer.user)
    const inputRef: any = useRef()

    const [isLoading, setImageIsLoading] = useState<boolean>()
    const [imageLocal, setThumbLocal] = useState<string | ArrayBuffer | null>()

    function changeProfileImage() {
        inputRef.current.click()
    }

    function fileOnChange({ target: { files } }: any) {

        const file = files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                const blob = reader.result
                getThumbnailBlob(blob)
            }

            reader.readAsDataURL(file)
        }
    }

    async function getThumbnailBlob(base64: string | ArrayBuffer | null) {
        setImageIsLoading(true)
        setThumbLocal(base64)
        const response = await UploadAPI.uploadFile({ base64, resource_type: 'image', preset: 'image_preset' })
        console.log(response)
        if (response.secure_url) {
            setImageIsLoading(false)
            const imageAsset = {
                publicId: response.public_id,
                secureURL: response.secure_url
            }
            dispatch(authActions.setUserProps({
                name: 'imageAsset',
                value: imageAsset
            }))

            dispatch(updateUserThunk({
                update: { imageAsset },
                networkSatusList: [
                    'image-upload',
                    'image-upload-success',
                    'image-upload-error'
                ]
            }))
        }
    }


    const mustang = 'https://cdn.images.autoexposure.co.uk/AETA13757/AETV25310894_1.jpg'
    return (
        <TopHeader sx={{ height: height ? height : 180 }}>
            <ChatPersonInfo
                userId={user?._id ?? ''}
                changeImagePreview={imageLocal}
                fullnameStyles={{ fontSize: 30, lineHeight: 1.2, fontWeight: 600 }}
                fullname={`${user.firstName} ${user.lastName}`}
                avatarSize={140}
                subText={user.email}
                changeProfileImage={changeProfileImage}
                indicatorStyles={{
                    position: 'absolute',
                    left: 118,
                    bottom: 20,
                    width: 16,
                    height: 16
                }}
            />
            <input type="file" onChange={fileOnChange} ref={inputRef} hidden />
        </TopHeader>
    )
}