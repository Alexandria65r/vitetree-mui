import { Box, styled } from '@mui/material'
import React from 'react'
import { useAppDispatch, useSelectedElement } from '../../../store/hooks'
import { elementsActions } from '../../../reducers/elements-reducer'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import ChildRootLine from './child-root-line'
import { AddNewElementThunk } from '../../../reducers/elements-reducer/elements-thunks'
import NewItemInput from './new-item-input'


const Container = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginTop: 0,
  flex: 1,
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

  return (
    <Container>
      <ChildRootLine color={color ?? ''} />
      <NewItemInput placeholder='New item' color={color ?? ''} createIcon={<VerticalAlignTopIcon sx={{ color: `${color ?? ''}!important` }} />} create={create} />
    </Container>
  )
}


