import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { colors, useTheme } from '@mui/material';
import { colorScheme } from '../theme';
import SearchIcon from '@mui/icons-material/Search';



interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

type Props = {

}



export default function TopTabTabs({ }: Props) {
    const _theme = useTheme()
    const router = useRouter()
    const [value, setValue] = React.useState(0);
    const params: any = router.query.params || []
    const links = [{ name: 'feed', path: 'feed', icon: SearchIcon }, { name: 'find-creators', path: 'find-creators/q=nothing', icon: SearchIcon }]
    console.log(router.asPath.split('/'))

    React.useEffect(() => {
        if (params?.length) {
            const path = links.find((item) => item.name === router.asPath.split('/')[1])
            if (path) {
                const index = links.indexOf(path)
                setValue(index)
            }
        }

    }, [params?.length])

    const handleChange = (event: React.SyntheticEvent, index: number) => {
        setValue(index);
        router.push(`/${links[index].path}`)
    };


    return (

        <Tabs
            value={value}
            textColor={colors.teal[500] as any}
            TabIndicatorProps={{
                style: {
                    display: 'none'
                }
            }}
            sx={{ minHeight: 0, px: 1, height: 'auto', backgroundColor: 'transparent' }}
            onChange={handleChange} aria-label="basic tabs example">
            {links.map((link, index) => (
              
                    <Tab
                        key={index}
                        sx={{
                           
                            alignItems: 'center',
                            minWidth: 'fit-content',
                            fontSize: 15,
                            height: 0, py: 1.8, px: 0, minHeight: 0,
                            color: value === index ? colors.teal[500] : colorScheme(_theme).TextColor,
                            fontWeight: value === index ? 600 : 500,
                            textTransform: 'capitalize',
                            backgroundColor: 'transparent',
                            '&:nth-of-type(odd)': {
                                mr: 2
                            },
                            borderBottom: value === index ? `2px solid ${colors.teal[500]}` : 0
                        }}
                        label={link.name.replace('-', ' ')}
                        id={`simple-tab-${index}`}
                    />
               
            ))}

        </Tabs>

    );
}