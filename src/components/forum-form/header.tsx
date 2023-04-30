import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function HeaderTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} sx={{ height: 60, }} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Accademic question" sx={{
                        height: 60,
                        flex: 1, fontWeight: 600,
                        textTransform: 'capitalize'
                    }} {...a11yProps(0)} />
                    <Tab label="Hire Tutor" sx={{
                        height: 60,
                        flex: 1, fontWeight: 600,
                        textTransform: 'capitalize'
                    }} {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                Stuck
            </TabPanel>
            <TabPanel value={value} index={1}>
                Hire Tutor
            </TabPanel>

        </Box>
    );
}
