import { Box, Checkbox, SxProps, Theme, colors, styled } from "@mui/material"
import element from "slate-react/dist/components/element"
import PersonPickerPopper from "./poppers/person-picker-popper"
import StatusAndPriorityPickers from "./poppers/status-and-priority-pickers"
import { useAppDispatch, useAppSelector, useElementAction, useGroupAction, useSelectedElement } from "../../../store/hooks"
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';
import RadioButtonCheckedOutlinedIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import { UpdateElementPayload, elementsActions } from "../../../reducers/elements-reducer"
import { PickerButton } from "../../reusable/styles"
import { updateElementThunk } from "../../../reducers/elements-reducer/elements-thunks"


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
    id: string
    color: string
    pickerBtnStyles: SxProps<Theme>
    avataSize: number
}

type StatusPickerButtonProps = {
    bindTrigger: any
    bgColor: string
    picker:'status'|'priority'
}


export default function ElementCellHeader({ color, id, avataSize, pickerBtnStyles }: Props) {
    const dispatch = useAppDispatch()
    const isMarkEnabled = useGroupAction({ action: 'mark-children' })
    const checkItems = useAppSelector((state) => state.ElementsReducer.checkedItems)
    const element = useSelectedElement(id)






    function pickerButton({ bindTrigger, bgColor,picker }: StatusPickerButtonProps) {
        return (
            <PickerButton sx={{
                borderRadius: 19,
                width: '100%',
                bgcolor: bgColor,
                border: `1px solid ${bgColor}`,
                ...pickerBtnStyles
            }}
                {...bindTrigger}>
                {element[picker]?.value || picker}
            </PickerButton>
        )
    }

    function onClick(update: UpdateElementPayload) {
        dispatch(updateElementThunk({
            elementId: id,
            update
        }))
    }


    return (
        <SubHead sx={{ borderColor: color }}>
            {isMarkEnabled && (
                <Checkbox checked={checkItems.includes(id)}
                    onChange={() => dispatch(elementsActions.checkItem(id))}
                    sx={{
                        m: 0, p: 0, color,
                        '&.Mui-checked': {
                            color,
                        },
                        '&.MuiSvgIcon-root': { fontSize: 23, }
                    }} />
            )}
            <StatusAndPriorityPickers pickerBtnStyles={pickerBtnStyles}
                id={id}
                pickerButton={pickerButton}
                onClick={onClick}

            />
            <PersonPickerPopper size={avataSize} id={id} color={color} />
        </SubHead>
    )
}


