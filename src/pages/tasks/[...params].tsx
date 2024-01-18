import React, { useState } from 'react'
import Layout from '../../components/layout'
import { Box, styled } from '@mui/material'
import ProjectTreeButton from '../../components/element-tree/project-tree-button';
import { ButtonIcon, StyledButton, StyledInput } from '../../reusable/styles';
import { Add } from '@mui/icons-material';
import { colorScheme } from '../../theme';
import MainElement from '../../components/element-tree/group-head';
import UserAvatar from '../../components/user/user-avatar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import GroupedSubItem from '../../components/element-tree/grouped-sub-item';
import TreeOptions from '../../components/element-tree/tree-options';
import TreePickers from '../../components/element-tree/tree-pickers';
import SubItemInput from '../../components/element-tree/sub-item-input';
import { useAppSelector, useParentElements } from '../../../store/hooks';
import ElementTreeItem from '../../components/element-tree/element-tree-item';
import RenderElementTreeItems from '../../components/element-tree/render-element-tree-items';

const Container = styled(Box)(() => ({
    padding: 10,
}))







type Props = {}

export default function Tasks({ }: Props) {
    const elements = useParentElements().reverse()


    return (
        <Layout>
            <Container>
                {/* <RenderElementTreeItems elements={elements} /> */}
            </Container>
        </Layout>
    )
}