import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { colors, useTheme } from '@mui/material';
import { colorScheme } from '../../theme';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type Props = {
    links: string[];
    path: string
    mode: 'author' | 'read-only'
}



export default function PageTabs({ links, path, mode }: Props) {
    const router = useRouter()
    const [value, setValue] = React.useState(0);
    const params: any = router.query.params || []
    const _theme = useTheme()
    React.useEffect(() => {
        if (params?.length) {
            const index = links.indexOf(params[1])
            setValue(index)
        }

    }, [params?.length])

    const handleChange = (event: React.SyntheticEvent, index: number) => {
        setValue(index);
        router.push(`/${path}/${links[index]}`)
    };


    return (
        <Box sx={{}}>
            <Tabs
                textColor={colors.teal[500] as any}
                TabIndicatorProps={{
                    style: {
                        backgroundColor: colors.teal[500]
                    }
                }}
                value={value} sx={{ minHeight: 0, height: 'auto', justifyContent: 'center', backgroundColor: 'transparent' }} onChange={handleChange} aria-label="basic tabs example">
                {links.map((link, index) => (
                    <Tab
                        key={index}
                        sx={{
                            color: value === index ? colors.teal[500] : colorScheme(_theme).TextColor,
                            height: 0, padding: 2, minHeight: 0,
                            textTransform: 'capitalize',
                            backgroundColor: 'transparent'
                        }}
                        label={link.replace('-', ' ')}
                        id={`simple-tab-${index}`}
                    />
                ))}
            </Tabs>
        </Box>
    );
}