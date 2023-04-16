import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers';

import ReusableAlert from '../reusable-alert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deletTestDataThunk } from '../../../reducers/thunks';

export default function DuplicateTestModal() {
    const dispatch = useAppDispatch()
    const deleteTestModal = useAppSelector((state) => state.MainReducer.deleteTestModal)
    const isDeleting = useAppSelector((state) => state.TestReducer.isDeleting)
    function handleClose() {
        dispatch(mainActions.setDeleteTestModal({
            component: 'close',
            testId:'',
            subject:''
        }))
    }
    return (
        <div>
            <Modal
                open={deleteTestModal.component !== 'close'}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ReusableAlert
                    title='Delete'
                    cancelHandler={handleClose}
                    procceedAction={() => dispatch(deletTestDataThunk())}
                    type='delete'
                    loading={isDeleting}
                    proccedIcon={<DeleteOutlineOutlinedIcon fontSize='small' sx={{ mr: 1 }} />}
                    message={`
                    This test data will be deleted. Are you sure you want to delete
                        <b> ${deleteTestModal.subject}</b>?
                    `}
                />
            </Modal>
        </div>
    );
}