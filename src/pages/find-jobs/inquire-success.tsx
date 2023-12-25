import { Box, Typography } from '@mui/material'
import React from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
type Props = {}

export default function InquireSuccess({}: Props) {
  return (
      <Box sx={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%', margin: 'auto' }}>
          <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircleOutlineOutlinedIcon color='success' fontSize='large' />
              </Box>
              <Typography sx={{ textAlign: 'center', lineHeight: 1.3, fontSize: 22, fontWeight: 300 }}>
                  Your inquiry has been successfully sent
              </Typography>
              <Typography sx={{ textAlign: 'center', fontSize: 13, fontWeight: 300 }}>
                  This component needs a design
              </Typography>
          </Box>
      </Box>
  )
}