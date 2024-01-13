import { Box, styled } from '@mui/material'
import React from 'react'
import { colorScheme } from '../../theme'
import { ButtonIcon, StyledInput, Textarea } from '../../reusable/styles'
import { BiColorFill, BiDuplicate } from 'react-icons/bi'
import { HiPencil } from 'react-icons/hi'
import { MdNotes, MdAdd } from 'react-icons/md'
import { useAppDispatch, useSelectedElement } from '../../../store/hooks'
import { elementsActions } from '../../../reducers/elements-reducer'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import ChildRootLine from './child-root-line'
import { AddNewElementThunk } from '../../../reducers/elements-reducer/elements-thunks'


const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
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
  borderTopRightRadius: 9,
  borderBottomRightRadius: 9,
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

const Input = styled(Textarea)(({ theme }) => ({
  flex: 1,
  paddingBlock: 10,
  paddingInline: 18,
  borderRadius: 5,
  border: 0,
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  zIndex: 200,
  backgroundColor: colorScheme(theme).lightToSecondaryColor,
  boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

type Props = {
  id: string
}

export default function SubItemInput({ id }: Props) {
  const dispatch = useAppDispatch()
  const cartegory = useSelectedElement(id)?.cartegory
  const color = useSelectedElement(id)?.color
  function create() {
    dispatch(AddNewElementThunk({ elementType: 'child', cartegory: cartegory ?? '', parentElementId: id }))
    dispatch(elementsActions.clearElementAction())
  }



  function handleBlur() {
    setTimeout(() => {
      dispatch(elementsActions.clearElementAction())
    }, 100)
  }
  return (
    <Container>
      <ChildRootLine color={color ?? ''} />
      <Options sx={{ flex: 1,my:1 }}>
        <Input
          onChange={({ target }) => dispatch(elementsActions.setNewElementName(target.value))}
          //onBlur={handleBlur}
          placeholder='Add Sub Task'
          autoFocus
          sx={{ '&:focus': { borderBottomColor: `${color}!important` } }}
        />
        <CreateButton onClick={create}>
          <VerticalAlignTopIcon sx={{ color: color ?? '' }} />
        </CreateButton>
      </Options>
    </Container>
  )
}


