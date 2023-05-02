import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Box } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};



type Props = {
    data: string[],
    name: string,
    value: string[];
    error: boolean;
    label: string;
    handleSelectedSection: (event: any) => void
}

export default function SelectWithCheckMarks({ name, data, value, label, error, handleSelectedSection }: Props) {
    const [personName, setPersonName] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const { target: { value } } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Box sx={{ flex: 1 }}>
            <FormControl sx={{display: 'flex' }}>
                <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
                <Select
                    error={error}
                    sx={{ flex: 1 }}
                    name={name}
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={value}
                    onChange={handleSelectedSection}
                    input={<OutlinedInput label={label} />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {data.map((section) => (
                        <MenuItem key={section} value={section}>
                            <Checkbox checked={value.indexOf(section) > -1} />
                            <ListItemText primary={section} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}