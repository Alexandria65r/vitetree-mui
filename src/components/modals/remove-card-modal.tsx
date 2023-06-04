import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers/main-reducer';

import ReusableAlert from '../reusable-alert';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deletTestDataThunk } from '../../../reducers/thunks';
import { authActions } from '../../../reducers/auth-reducer/auth-reducer';
import { removeCardThunk } from '../../../reducers/auth-reducer/auth-thunks';

export default function RemoveCartAlert() {
    const dispatch = useAppDispatch()
    const removeCardId = useAppSelector((state) => state.AuthReducer.removeCardId)
    const cards = useAppSelector((state) => state.AuthReducer.cards)
    const isDeleting = useAppSelector((state) => state.TestReducer.isDeleting)


    const card = cards.find((item) => item._id === removeCardId)

    function handleClose() {
        dispatch(authActions.setCardIdToRemove(''))
    }

    return (
        <div>
            <Modal
                open={removeCardId !== ''}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ReusableAlert
                    title='Remove Payment Method'
                    cancelHandler={handleClose}
                    procceedAction={() => dispatch(removeCardThunk(removeCardId))}
                    type='remove'
                    loading={isDeleting}
                    proccedIcon={<DeleteOutlineOutlinedIcon fontSize='small' sx={{ mr: 1 }} />}
                    message={`
                    You are about to remove this card. Are you sure you want to delete
                        <b>Visa ****${card?.cardNumber.slice(12, 16)}</b>?
                    `}
                />
            </Modal>
        </div>
    );
}