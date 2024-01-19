import { Box, Checkbox, SxProps, Theme, styled } from "@mui/material"
import element from "slate-react/dist/components/element"
import PersonPickerPopper from "./poppers/person-picker-popper"
import StatusAndPriorityPickers from "./poppers/status-and-priority-pickers"
import { useElementAction } from "../../../store/hooks"

const SubHead = styled(Box)(() => ({
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    borderRadius: 0,
    marginInline: 4,
    height: 35,
    paddingInline: 5,
    // boxShadow:`0 1px 3px 0 ${colorScheme(theme).greyToTertiary}`,
    //borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}!important`
}))


type Props = {
    id:string
    color:string
    pickerBtnStyles: SxProps<Theme>
    avataSize:number
}


export default function ElementCellHeader({ color, id, avataSize, pickerBtnStyles }:Props) {
    const isMarkEnabled = useElementAction({ action: 'mark-children' })
    return (
        <SubHead sx={{ borderColor: color }}>
            {isMarkEnabled && (
                <Checkbox checked={false} sx={{
                    m: 0, p: 0, color,
                    '&.Mui-checked': {
                        color,
                    },
                    '&.MuiSvgIcon-root': { fontSize: 23, }
                }} />
            )}
            <StatusAndPriorityPickers pickerBtnStyles={pickerBtnStyles} id={id}  />
            <PersonPickerPopper size={avataSize} id={id} color={color} />
        </SubHead>
    )
}