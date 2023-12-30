import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Box, styled } from '@mui/material'
import ProjectTreeButton from '../../components/element-tree/project-tree-button';
import { ButtonIcon, StyledButton, StyledInput } from '../../reusable/styles';
import { Add } from '@mui/icons-material';
import { colorScheme } from '../../theme';
import MainElement from '../../components/element-tree/main-element';
import UserAvatar from '../../components/user/user-avatar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GroupedSubItem from '../../components/element-tree/grouped-sub-item';
import TreeOptions from '../../components/element-tree/tree-options';
import TreePickers from '../../components/element-tree/tree-pickers';
import SubItemInput from '../../components/element-tree/sub-item-input';

const Container = styled(Box)(({ theme }) => ({
    padding: 10
}))
const NewElementWrapper = styled(Box)(({ theme }) => ({
    padding: '10px 0 10px 30px'
}))
const Input = styled(StyledInput)(({ theme }) => ({
    paddingInline: 18,
    borderRadius: 29,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

const NewElementButton = styled(StyledButton)(({ theme }) => ({
    fontSize: 15,
    fontWeight: 500,
    borderRadius: 25,
    paddingInline: 15,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

const ElementItemWrapper = styled(Box)(({ theme }) => ({
    width: 'fit-content',
    marginTop: 10,
}))
const MainElementWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 10,
}))



const SubElementWrapper = styled(Box)(({ theme }) => ({
    marginLeft: 15,
    borderBottomLeftRadius: 6,
    borderLeft: `6px solid #000`
}))

const DeleteButton = styled(ButtonIcon)(({ theme }) => ({
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    color: colorScheme(theme).TextColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToprimaryColor}`
}))

type Props = {}

export default function Tasks({ }: Props) {

    const [isAddNewElement, toggleAddNewElement] = useState(false)

    return (
        <Layout>
            <Container>
                <ProjectTreeButton />
                <ElementItemWrapper>
                    <MainElementWrapper>
                        <UserAvatar avatarStyles={null} />
                        <MainElement />
                        <DeleteButton>
                            <DeleteOutlineIcon />
                        </DeleteButton>
                    </MainElementWrapper>
                    <SubElementWrapper>
                        <TreePickers />
                        {[1, 2, 3, 4].map((subItem) => (
                            <GroupedSubItem />
                        ))}
                        <SubItemInput />
                        <TreeOptions />
                    </SubElementWrapper>
                </ElementItemWrapper>

                <NewElementWrapper>
                    {isAddNewElement ?
                        (<Input placeholder='New Task' autoFocus onBlur={() => toggleAddNewElement(false)} />) : (
                            <NewElementButton onClick={() => toggleAddNewElement(!isAddNewElement)}>
                                <Add sx={{ mr: 0 }} /> New Task
                            </NewElementButton>
                        )}
                </NewElementWrapper>
            </Container>
        </Layout>
    )
}