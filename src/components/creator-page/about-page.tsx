import { Box, styled } from '@mui/material'
import React, { useState } from 'react'
import page from '../../api-services/page'
import { ThemedText, colorScheme } from '../../theme'
import { Page } from '../../models/page/page.model'
import { ButtonIcon, StyledButton, Textarea } from '../../reusable/styles'
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from 'next/router'
import { useAppDispatch } from '../../../store/hooks'
import { pageActions } from '../../../reducers/page-reducer'
import updatePage from '../../pages/api/page/update/[pageId]'
import { FaEdit } from "react-icons/fa";
import { updatePageThunk } from '../../../reducers/page-reducer/page-thunks'

const About = styled(Box)(({ theme }) => ({
    justifyContent: 'center',
    width: '50%',
    margin: 'auto',
    minHeight: 100,
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
    }
}))
const AboutHead = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    [theme.breakpoints.down('sm')]: {
        height: 50,
        width: '100%',
        borderBottom: `1px solid ${colorScheme(theme).grayToSecondaryColor}`,
    }
}))
const EditFormWrap = styled(Box)(({ theme }) => ({
    width: '80%', display: 'grid', margin: 'auto',
    [theme.breakpoints.down('sm')]: {
        width: '90%',
    }
}))



type Props = {
    page: Page
    mode: 'author' | 'read-only'
}

export default function AboutPage({ page, mode }: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const [isEdit, setEdit] = useState<boolean>(false)

    function handleInputChange({ target }: any) {
        dispatch(pageActions.setPageData({ ...page, [target.name]: target.value }))
        console.log(target.value)
    }


    async function toggleEdit() {
        const { payload } = await dispatch(updatePageThunk({
            pageId: page.pageId,
            target: 'other',
            update: {
                about: page.about
            }
        }))
        if (payload.success) {
            setEdit(false)
        }
    }

    return (
        <About>
            <AboutHead>
                <ThemedText sx={{ textAlign: 'center', fontSize: 16, fontWeight: 600 }}>
                    About This Page
                </ThemedText>
                {mode === 'author' && (
                    <ButtonIcon onClick={() => setEdit(!isEdit)}>
                        <FaEdit fontSize={21} />
                    </ButtonIcon>
                )}
            </AboutHead>

            {isEdit ? (<EditFormWrap>
                <Textarea value={page.about} name="about" onChange={handleInputChange}
                    sx={{ width: '100%', borderRadius: 1 }} minRows={5}
                    placeholder='About Page' />
                <StyledButton onClick={toggleEdit}
                    sx={(theme) => ({
                        mt: 2,
                        justifySelf: 'end',
                        width: '30%',
                        bgcolor: colorScheme(theme).grayToSecondaryColor,
                        color: colorScheme(theme).TextColor
                    })}>
                    <FaRegEdit style={{ marginRight: 5 }} /> Update
                </StyledButton >
            </EditFormWrap>) : (<>
                <Box sx={{ display: 'grid', px: 1, py: 1, justifyContent: 'cente' }}>
                    <ThemedText sx={{ textAlign: 'center' }}>{page.about}</ThemedText>
                </Box>
            </>)
            }
        </About >
    )
}

