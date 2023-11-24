import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import SupportCreator from './support-creator';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}





export default function PageTabs() {
    const router = useRouter()
    const [value, setValue] = React.useState(0);
    const links = ['send-star', 'exclusive', 'about']
    const params: any = router.query.params || []

    React.useEffect(() => {
        const index = links.indexOf(params[1])
        setValue(index)
    }, [params])

    const handleChange = (event: React.SyntheticEvent, index: number) => {
        setValue(index);
        router.push(`/@creator/${links[index]}`)
    };


    return (
        <Box sx={{}}>
            <Tabs value={value} sx={{ minHeight: 0, height: 'auto', justifyContent: 'center' }} onChange={handleChange} aria-label="basic tabs example">
                {links.map((link, index) => (
                    <Tab
                        key={index}
                        sx={{
                            height: 0, padding: 2, minHeight: 0,
                            textTransform: 'capitalize'
                        }}
                        label={link.replace('-', ' ')}
                        id={`simple-tab-${index}`}
                    />
                ))}

            </Tabs>
        </Box>
    );
}