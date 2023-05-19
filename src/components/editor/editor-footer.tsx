import { Box, styled, useTheme } from '@mui/material'
import React, { useRef } from 'react'
import { Editor } from 'slate'
import { StyledButton, StyledButtonOutlined } from '../../reusable/styles'
import AttachmentOutlinedIcon from "@mui/icons-material/AttachmentOutlined";
import { Descendant } from 'slate';
import { colorScheme, useColorScheme } from '../../theme';


const Container = styled(Box)(() => ({
    display: 'flex',
    margin: '10px 0',
}))
const AddFilesColumn = styled(Box)(() => ({
    flex: 1,
}))

const AsideRight = styled(Box)(() => ({

}))






type Props = {
    value: Descendant[]
    editor: Editor
    onValueUpdate: () => void
    onCancel: () => void
}

export default function EditorFooter({ editor, value, onValueUpdate, onCancel }: Props) {
    const colorScheme = useColorScheme()

    //Add files
    const fileRef: any = useRef();
    function AddFiles(e: any) {
        fileRef.current.files = null;
        fileRef.current.click();
    }

    function handleFileChange(e: any) {
        const getData = () => "";
        const files = fileRef.current.files;
        const data: any = {
            files,
            getData,
        };
        editor.insertData(data);
        if (fileRef?.current) {
            fileRef.current.value = "";
        }
    }




    return (
        <Container>
            <AddFilesColumn>
                <StyledButtonOutlined onClick={AddFiles} >
                    <Box>
                        <AttachmentOutlinedIcon style={{transform:'rotate(-45deg)'}} />
                    </Box>
                    Add files
                </StyledButtonOutlined>
                <input
                    onChange={handleFileChange}
                    ref={fileRef}
                    type="file"
                    multiple={true}
                    hidden
                />
            </AddFilesColumn>
            {value ? (
                <AsideRight >
                    <StyledButton
                        onClick={onCancel}
                        sx={(theme)=> ({
                            backgroundColor: theme.palette.mode === 'light' ? "#e2e6ea" : colorScheme.secondaryColor,
                            color: colorScheme.TextColor,
                            marginRight: 1.5,
                        })}
                    >
                        Cancel
                    </StyledButton>
                    <StyledButton
                        onClick={onValueUpdate}

                    >
                        Update
                    </StyledButton>
                </AsideRight>
            ) : (
                <StyledButton onClick={onValueUpdate} >
                    Save
                </StyledButton>
            )}

        </Container>
    )
}