import { Box, styled } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector, useSelectedGroup } from '../../../store/hooks'
import { elementsActions } from '../../../reducers/elements-reducer'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import { AddNewElementThunk, createManyElementsThunk } from '../../../reducers/elements-reducer/elements-thunks'
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
  const newElementName = useAppSelector((state) => state.ElementsReducer.newElementName)
  const color = useSelectedGroup(id)?.color

  function create() {
    dispatch(AddNewElementThunk({ elementType: 'list-group-element', newElementName, groupId: id }))
  }

  async function createMultipleTasksOnPaste() {
    const clipboard = await navigator.clipboard.readText()
    const elements: string[] = clipboard.split('\n');
    if (elements) {
      dispatch(createManyElementsThunk({ elementType: 'list-group-element', elements, groupId: id }))
    }
  }

  return (
    <Container>
      {/* <ChildRootLine color={color ?? ''} /> */}
      <NewItemInput
        value={newElementName}
        onPaste={createMultipleTasksOnPaste}
        onChange={(target) => dispatch(elementsActions.setNewElementName(target.value))}
        placeholder='New item' color={color ?? ''}
        createIcon={<VerticalAlignTopIcon sx={{ color: `${color ?? ''}!important` }} />}
        create={create}
        sx={{ borderBottomColor: `${color}!important`, '&:focus': { borderBottomColor: `${color}!important` } }}
      />
    </Container>
  )
}


