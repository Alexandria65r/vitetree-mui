import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers';

import ReusableAlert from '../reusable-alert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function DeletePartcipantModal() {
    const dispatch = useAppDispatch()
    const deletePartcipantModal = useAppSelector((state) => state.MainReducer.deletePartcipantModal)


    function handleClose() {
        dispatch(mainActions.setDeletePartcipantModal({
            component: 'close',
            partcipantId:'',
            fullname:''
        }))
    }

    return (
        <div>
            <Modal
                open={deletePartcipantModal.component !== 'close'}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ReusableAlert
                    title='Delete Partcipant'
                    cancelHandler={handleClose}
                    procceedAction={() => { }}
                    type='delete'
                    proccedIcon={<DeleteOutlineOutlinedIcon fontSize='small' sx={{ mr: 1 }} />}
                    message={`
                    This Partcipant will be deleted. Are you sure you want to delete
                        <b> ${deletePartcipantModal.fullname}</b>?
                    `}
                />
            </Modal>
        </div>
    );
}