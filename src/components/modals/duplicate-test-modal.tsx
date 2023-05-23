import * as React from 'react';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers/main-reducer';
import ReusableAlert from '../reusable-alert';
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import { duplicateTestThunk } from '../../../reducers/thunks';
import { testDataSchema } from '../../reusable/schemas';

export default function DuplicateTestModal() {
    const dispatch = useAppDispatch()
    const duplicateTestModal = useAppSelector((state) => state.MainReducer.duplicateTestModal)
    const isDuplicating = useAppSelector((state) => state.TestReducer.isDuplicating)


    function handleClose() {
        dispatch(mainActions.setDuplicateTestModal({
            component: 'close',
            testData: testDataSchema
        }))
    }

    function duplicate() {
        dispatch(duplicateTestThunk(duplicateTestModal.testData))
    }


    return (
        <div>
            <Modal
                open={duplicateTestModal.component !== 'close'}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <ReusableAlert
                    title='Duplicate'
                    cancelHandler={handleClose}
                    procceedAction={duplicate}
                    type='duplicate'
                    loading={isDuplicating}
                    proccedIcon={<AddToPhotosOutlinedIcon fontSize='small' sx={{ mr: 1 }} />}
                    message={`
                    This test data will be duplicated. Are you sure you want to create a copy of
                       <b> ${duplicateTestModal.testData?.subjectOrlanguage}</b>?
                    `}
                />

            </Modal>
        </div>
    );
}