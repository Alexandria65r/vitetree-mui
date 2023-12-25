import { Box, Typography } from '@mui/material'
import React from 'react'
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
type Props = {}

export default function SelectTutor({}: Props) {
  return (
      <Box sx={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%', margin: 'auto' }}>
          <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PersonSearchOutlinedIcon  fontSize='large' />
              </Box>
              <Typography sx={{ textAlign: 'center', lineHeight: 1.3, fontSize: 22, fontWeight: 300 }}>
                  Select a tutor for more information
              </Typography>
              <Typography sx={{ textAlign: 'center', fontSize: 13, fontWeight: 300 }}>
                  This component needs a design
              </Typography>
          </Box>
      </Box>
  )
}