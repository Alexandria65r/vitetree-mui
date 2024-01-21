import { Box, Tooltip, colors, styled, useTheme } from "@mui/material"
import { useAppDispatch, useAppSelector, useElementAction, useGroupColorByElementId } from "../../../store/hooks"
import { ThemedText, colorScheme } from "../../theme"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { BiDuplicate } from 'react-icons/bi'
import { ImMoveUp } from 'react-icons/im'
import { ButtonIcon } from "../../reusable/styles";
import DisabledByDefaultOutlinedIcon from '@mui/icons-material/DisabledByDefaultOutlined';
import { elementsActions } from "../../../reducers/elements-reducer";
import styles from './styles/element-tree.module.css'


const Container = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '30%',
    top: 30,
    left: '50%',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    transform: 'translateX(-50%)',
    backgroundColor: colorScheme(theme).lightToSecondaryColor,
    boxShadow: `0 1px 3px 0 ${colorScheme(theme).grayToSecondaryColor}`,
    border: `1px solid ${colorScheme(theme).greyToTertiary}!important`,
    [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap',
        top: 5,
        width: '90%',
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

}


export default function BulkActionsMenu({ }: Props) {
    const dispatch = useAppDispatch()
    const isMarkEnabled = useElementAction({ action: 'mark-children' })
    const checkItems = useAppSelector((state) => state.ElementsReducer.checkedItems)
    const _theme = useTheme()



    if (!checkItems.length) return null
    return (
        <Container >
            <LeftCol >
                <ThemedText sx={{
                    flexBasis: '100%',
                    my: .8, mx: 1, fontSize: 16,
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                    [_theme.breakpoints.down('sm')]: {
                        mb:0
                    }
                }}>
                    {checkItems.length} Item{checkItems.length > 1 && 's'} Selected
                </ThemedText>
                <MappedCheckedCountItems className={styles.MappedCheckedCountItems}>
                    {checkItems.map((checkedId) => <RenderCheckedCountItem checkedId={checkedId} />)}
                </MappedCheckedCountItems>
            </LeftCol>
            <MoreActions >
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
                    <IconButton>
                        <DeleteOutlinedIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Tooltip>

                <Tooltip title='Clear selected'>
                    <IconButton onClick={() => dispatch(elementsActions.clearCheckedItems())}>
                        <DisabledByDefaultOutlinedIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                </Tooltip>
            </MoreActions>
        </Container>
    )
}
type RenderCheckedCountItemProps = {
    checkedId: string
}
function RenderCheckedCountItem({ checkedId }: RenderCheckedCountItemProps) {
    const color = useGroupColorByElementId(checkedId)
    return (
        <CheckedCountItem sx={{ bgcolor: color }}></CheckedCountItem>
    )
}