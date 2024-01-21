import { Box, SxProps, Theme, styled } from '@mui/material'
import React, { MutableRefObject, ReactNode, useRef } from 'react'
import { colorScheme } from '../../theme'
import { ButtonIcon, Textarea } from '../../reusable/styles'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'


const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  // alignItems: 'center',
  marginTop: 0,

}))

const Options = styled(Box)(({ theme }) => ({
  height: 40,
  display: 'flex',
  gap: 0,
  alignItems: 'center',
}))
const CreateButton = styled(ButtonIcon)(({ theme }) => ({
  height: 40,
  borderRadius: 0,
  margin: 0,
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

const Input = styled(Textarea)(({ theme }) => ({
  flex: 1,
  paddingBlock: 11,
  paddingInline: 18,
  borderRadius: 12,
  border: 0,
  borderBottom: '2px solid transparent',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  zIndex: 200,
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

type Props = {
  placeholder: string;
  createIcon: ReactNode;
  color?: string;
  value: string
  onChange: (target: any) => void
  create: () => void
  sx?: SxProps<Theme>
  btnSx?: SxProps<Theme>

}

export default function NewItemInput({ onChange, value, sx, btnSx, create, color, placeholder, createIcon }: Props) {
  const dispatch = useAppDispatch()
  const newElementName = useAppSelector((state) => state.ElementsReducer.newElementName)
  const inputRef: MutableRefObject<HTMLTextAreaElement> | any = useRef()

  function handleBlur() {
    create()
    inputRef.current.focus()
  }


  function handleKeyUp(e: any) {
    e.preventDefault()
    if (e.key === 'Enter') {
      create()
    }
  }


  return (
    <Container>
      <Options sx={{ flex: 1, my: 1 }}>
        <Input
          ref={inputRef}
          value={value}
          onChange={({ target }) => { onChange(target) }}
          placeholder={placeholder}
          onKeyUp={handleKeyUp}
          autoFocus
          onBlur={handleBlur}
          sx={{ '&:focus': { borderBottomColor: `${color}` }, ...sx, }}
        />
        <CreateButton sx={btnSx} onClick={handleBlur}>
          {createIcon}
        </CreateButton>
      </Options>
    </Container>
  )
}


