import * as React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { mainActions } from '../../../reducers/main-reducer';
import { styled } from '@mui/material';
import { colorScheme } from '../../theme';


const ToastContainer = styled(Stack)(({ theme }) => ({
    width: '20%',
    position: 'fixed',
    right: '50%',
    top: 10,
    zIndex: 9999,
    transform: 'translateX(50%)',
    [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 16px)',
    },
    [theme.breakpoints.up('md')]: {
        width: '30%',
    }
}))



export default function Toast() {
    const dispatch = useAppDispatch()
    const toasts = useAppSelector((state) => state.MainReducer.toasts)


    return (
        <ToastContainer
            sx={{}} spacing={2}>
            {toasts.map((toast, index) => (
                <Alert className='toast' key={index}
                    sx={(theme) => ({
                        backgroundColor: theme.palette.mode === 'light' ? '#000' : colorScheme(theme).secondaryColor,
                        color: '#fff',
                        borderRadius: 2
                    })}
                    onClose={() => dispatch(mainActions.closeToast(toast.id))}>
                    {toast.message}
                </Alert>
            ))}
        </ToastContainer>
    );
}