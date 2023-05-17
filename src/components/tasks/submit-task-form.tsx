import { Box, colors, styled, useTheme } from '@mui/material'
import React from 'react'
import { StyledBox, StyledButton } from '../../reusable/styles'
import { colorScheme } from '../../theme'
import { CSS_PROPERTIES } from '../../reusable'


const Dropzone = styled(Box)(({ theme }) => ({
    height: 140,
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px dashed #000`,
    borderRadius: CSS_PROPERTIES.radius10,
}))


const SubmitFooter = styled(Box)(({ theme }) => ({
    marginTop: 15,
    display: 'flex',
    justifyContent: 'flex-end'
}))


type Props = {
 
}

export default function SubmitTaskForm({  }: Props) {
    const _theme = useTheme() 
  return (
      <Box>
          <Dropzone>
              <StyledButton sx={{
                  borderRadius: 29,
                  bgcolor: _theme.palette.mode === 'light' ? colors.lime[400] : colorScheme(_theme).primaryColor
              }}>
                  Browse Files
              </StyledButton>
          </Dropzone>
          <SubmitFooter>
              <StyledButton sx={{
                  flex: 1,
                  borderRadius: 29
                  , bgcolor: _theme.palette.mode === 'light' ? colors.lime[400] : colorScheme(_theme).primaryColor
              }}>
                  Submit Task
              </StyledButton>
          </SubmitFooter>
      </Box>
  )
}