import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { colors } from '@mui/material';
import classes from '../../styles/reusable.module.css'
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { forumActions } from '../../../reducers/forum-reducer';
import { SlGraduation } from 'react-icons/sl'
import { FaQuestionCircle } from 'react-icons/fa'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HeaderTabs() {
    const dispatch = useAppDispatch()
    const newPostTabValue = useAppSelector((state) => state.ForumReducer.newPostTabValue)
    const postCartegory = ['Academic question', 'Hire Tutor']
    const cartegory = postCartegory[newPostTabValue]
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        dispatch(forumActions.setTabValue(newValue))
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    className={'forumFormTabs'}
                    value={newPostTabValue}
                    TabIndicatorProps={{
                        sx: {
                            height: 3,
                            backgroundColor: colors.teal[400],
                            borderTopLeftRadius: 8,
                            borderTopRightRadius: 8,
                        },
                    }}
                    onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Academic question"
                        icon={<FaQuestionCircle size={20}/>}
                        sx={{

                            flex: 1,
                            fontWeight: 600,
                            textTransform: 'capitalize',
                        }} {...a11yProps(0)} />
                    <Tab label="Hire Tutor"
                        icon={<SlGraduation size={22} />}
                        sx={{

                            flex: 1,
                            fontWeight: 600,
                            textTransform: 'capitalize',

                        }} {...a11yProps(1)} />
                </Tabs>
            </Box>
        </Box>
    );
}
