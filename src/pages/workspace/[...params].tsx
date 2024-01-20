import React, { useEffect } from 'react'
import Layout from '../../components/layout'
import router, { useRouter } from 'next/router';
import { fetchCurrentWorkspaceThunk, fetchWorkspaceThunk } from '../../../reducers/workspace-reducer/workspace-thunks';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

type Props = {}

export default function WorkspaceSettings({ }: Props) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const workspace = useAppSelector((state) => state.WorkspaceReducer.workspace)

  const [workspaceId]: any = router.query.params || []

  useEffect(() => {

    if (workspaceId) {
      dispatch(fetchWorkspaceThunk(workspaceId ?? ''))
    } else {
      router.push(`/workspaces`)
    }
  }, [workspaceId])

  return (
    <Layout>
      {workspace.name}
    </Layout>
  )
}