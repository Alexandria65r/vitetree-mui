import { Box, Tooltip, colors, styled, useTheme } from "@mui/material"
import { useAppDispatch, useAppSelector, useElementAction, useGroupColorByElementId, useSelectedGroup } from "../../../store/hooks"
import { ThemedText, colorScheme } from "../../theme"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { BiDuplicate } from 'react-icons/bi'
import { ImMoveUp } from 'react-icons/im'
import { ButtonIcon, PickerButton } from "../../reusable/styles";
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import { UpdateElementPayload, elementsActions } from "../../../reducers/elements-reducer";
import styles from './styles/element-tree.module.css'
import PriorityPickerPopper from "./poppers/priority-picker-popper";
import StatusPickerPopper from "./poppers/status-picker-popper";
import { deleteBulkElementsThunk, updateBulkElementsThunk, updateElementThunk } from "../../../reducers/elements-reducer/elements-thunks";
import { GoDotFill } from "react-icons/go";
import { mainActions } from "../../../reducers/main-reducer";

const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    top: 30,
    left: 0,
    //transform: 'translateX(-50%)',
    [theme.breakpoints.down('sm')]: {
        top: 5,
    },
    [theme.breakpoints.up('md')]: {
        top: 5,
    }
}))
const MenuWrapper = styled(Box)(({ theme }) => ({
    minWidth: '30%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToSecondaryColor}`,
    border: `1px solid ${colorScheme(theme).greyToTertiary}!important`,
    [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        width: '90%',
    },
    [theme.breakpoints.up('md')]: {
        //width: '40%',
        maxWidth: '45%',
    }
}))


const LeftCol = styled(Box)(({ theme }) => ({
    flexBasis: '30%',
    borderRight: `1px solid ${colorScheme(theme).greyToTertiary}`,
    [theme.breakpoints.down('sm')]: {
        flexbasis: '100%',
        borderRight: 0,
        borderBottom: `1px solid ${colorScheme(theme).greyToTertiary}`,
    },
}))

const MappedCheckedCountItems = styled(Box)(({ theme }) => ({
    padding: 6,
    display: 'flex',
    gap: 5,
    borderTop: `1px solid ${colorScheme(theme).greyToTertiary}`,
    overflow: 'auto',
    [theme.breakpoints.up('md')]: {
        maxWidth: 200,
    },
    [theme.breakpoints.up('xl')]: {
        maxWidth: 280,
    },
    [theme.breakpoints.down('sm')]: {
        border: `1px solid ${colorScheme(theme).greyToTertiary}`,
        maxWidth: 'unset',
        width: 'calc(100vw - 63px)',
        padding: 5,
        margin: '5px 10px',
        borderRadius: 10,
        backgroundColor: colorScheme(theme).lightToTertiary
    },
}))
const CheckedCountItem = styled(Box)(({ theme }) => ({
    padding: 6,
    backgroundColor: colors.teal[400],
    borderRadius: '50%',
}))

const MoreActions = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
    [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        padding: 5,
    },
}))


const IconButton = styled(ButtonIcon)(({ theme }) => ({
    height: 40,
    width: 40,
    border: `1px solid ${colorScheme(theme).greyToTertiary}`,
    '&:hover': {
        backgroundColor: colorScheme(theme).greyToTertiary
    },
    [theme.breakpoints.down('sm')]: {
        height: 35,
        width: 35
    },
}))

type Props = {
    mode: 'mark-groups' | 'mark-elements'
    checkItems: string[]
    moveTo: () => void
    duplicate?: () => void
    deleteSelected: () => void
    clearSelected: () => void
}
type StatusPickerButtonProps = {
    bindTrigger: any
    bgColor: string
    picker: 'status' | 'priority'
}

export default function BulkActionsMenu({ mode, checkItems, moveTo, duplicate, deleteSelected, clearSelected }: Props) {
    const dispatch = useAppDispatch()

    const _theme = useTheme()


    function pickerButton({ bindTrigger, bgColor, picker }: StatusPickerButtonProps) {
        return (
            <Tooltip title={picker + ' picker'}>
                <IconButton {...bindTrigger}>
                    <GoDotFill color={bgColor} size={35} />
                </IconButton>
            </Tooltip>
        )
    }

    function onClick(update: UpdateElementPayload) {
        dispatch(updateBulkElementsThunk(update))
    }

    if (!checkItems.length) return null
    return (
        <Container >
            <MenuWrapper className="toast">
                <LeftCol >
                    <ThemedText sx={{
                        flexBasis: '100%',
                        my: .8, mx: 1, fontSize: 16,
                        whiteSpace: 'nowrap',
                        fontWeight: 600,
                        [_theme.breakpoints.down('sm')]: {
                            mb: 0
                        }
                    }}>
                        {checkItems.length} Item{checkItems.length > 1 && 's'} Selected
                    </ThemedText>
                    <MappedCheckedCountItems className={styles.MappedCheckedCountItems}>
                        {checkItems.map((checkedId) => <RenderCheckedCountItem mode={mode} checkedId={checkedId} />)}
                    </MappedCheckedCountItems>
                </LeftCol>
                <MoreActions>
                    {mode === 'mark-elements' && (
                        <Box sx={{ display: 'flex', gap: '10px' }}>
                            <PriorityPickerPopper MainButton={pickerButton} onClick={onClick} />
                            <StatusPickerPopper MainButton={pickerButton} onClick={onClick} />
                        </Box>
                    )}

                    <Tooltip title='Duplicate'>
                        <IconButton>
                            <BiDuplicate style={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Move To'>
                        <IconButton>
                            <ImMoveUp style={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Delete'>
                        <IconButton onClick={deleteSelected}>
                            <DeleteOutlinedIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title='Clear selected'>
                        <IconButton onClick={clearSelected}>
                            <DisabledByDefaultOutlinedIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>
                </MoreActions>
            </MenuWrapper>
        </Container>
    )
}
type RenderCheckedCountItemProps = {
    mode: 'mark-groups' | 'mark-elements'
    checkedId: string
}
function RenderCheckedCountItem({ checkedId, mode }: RenderCheckedCountItemProps) {
    const color = mode === 'mark-elements' ? useGroupColorByElementId(checkedId) : useSelectedGroup(checkedId)?.color ?? ''

    return (
        <CheckedCountItem sx={{ bgcolor: color }}></CheckedCountItem>
    )
}