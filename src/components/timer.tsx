import { Box, Typography, colors, styled } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { CSS_PROPERTIES } from '../reusable'
import { colorScheme } from '../theme'
import { connect } from 'react-redux'
import { AppState } from '../../store/store'
import { Participant, Test } from '../reusable/interfaces'
import { markTakenTestThunk } from '../../reducers/thunks'
import { testActions } from '../../reducers/test-reducer'

const Container = styled(Box)(({ theme }) => ({
    //width:'30%',
    userSelect: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    display: 'flex',
    zIndex: 60,
    alignItems: 'center',
    borderRadius: CSS_PROPERTIES.radius5,
    transform: 'translate(-50%, -50%)',
    border: `1px solid ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? colors.grey[100] : colorScheme(theme).secondaryColor,
    [theme.breakpoints.down("sm")]: {
        width: 'fit-content',
    }
}))
const TimerContainer = styled(Box)(({ theme }) => ({
    flexBasis: '30%',
    display: 'flex',
    justifyContent: 'center',
    padding: '8px 10px',
    borderTopRightRadius: CSS_PROPERTIES.radius5,
    borderBottomRightRadius: CSS_PROPERTIES.radius5,
    borderLeft: `1px solid ${colorScheme(theme).chatBoarderColor}`,
    backgroundColor: theme.palette.mode === 'light' ? colors.grey[100] : colorScheme(theme).secondaryColor,
    [theme.breakpoints.down("sm")]: {

    }
}))
const DurationCol = styled(Box)(({ theme }) => ({
    flex: 1,
    padding: '5px 10px',
}))
const TimerText = styled(Typography)(() => ({
    fontSize: 13,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: colors.teal[400],
    fontWeight: 600
}))



interface Props {
    pathName: string
    newTest: Test
    partcipant: Participant
    showTestTimer: boolean,
    dispatch: (fn: any) => void
}

interface State {
    second: number,
    minute: number
    hour: number,
    isTimeUp: boolean
}

class Timer extends React.Component<Props, State>{
    interval: any = null

    constructor(props: Props) {
        super(props)
        this.state = {
            second: 0,
            minute: 0,
            hour: 0,
            isTimeUp: false
        }
    }



    tick = () => {
        if (!this.props.partcipant._id || this.props.partcipant.taken) return
        this.setState({ second: this.state.second + 1 })
        if (this.state.second === 59) {
            this.setState({ second: 0 })
            this.setState({ minute: this.state.minute + 1 })
        } else if (this.state.minute === 59) {
            this.setState({ minute: 0 })
            this.setState({ hour: this.state.hour + 1 })
        }
        this.persistTimer()
        this.timeUpHandler()
    }


    async timeUpHandler() {
        const TestDuration = this.props.newTest.duration?.toLowerCase()
        const timer = parseInt(this.props.newTest.duration ?? '0');
        console.log(TestDuration)
        console.log(timer)
        // withing minutes
        if (TestDuration?.includes('mins')) {
            if (this.state.minute === timer || this.state.minute >= timer) {
                this.setState({
                    isTimeUp: true
                })
                this.props.dispatch(markTakenTestThunk())
                clearInterval(this.interval)
            }
            //within hours
        } else if (TestDuration?.includes('hr')) {
            if (this.state.hour === timer || this.state.hour >= timer) {
                this.setState({
                    isTimeUp: true
                })
                this.props.dispatch(markTakenTestThunk())
                clearInterval(this.interval)

            }
        }
    }

    componentWillUnmount(): void {
        clearInterval(this.interval)
        localStorage.removeItem('timer-state')
        // check if the test has been updated if not
        // mark it and update it
        if (!this.props.partcipant.taken) {
            this.props.dispatch(markTakenTestThunk())
        }
    }

    componentDidMount(): void {
        const timerStateStorage = localStorage.getItem('timer-state')
        if (timerStateStorage !== null) {
            this.setState({
                ...JSON.parse(timerStateStorage)
            })
        }
        const showTimerStorage: any = localStorage.getItem('showTestTimer')
        if (showTimerStorage) {
            const parsed = JSON.parse(showTimerStorage)
            this.props.dispatch(testActions.setShowTestTimer(parsed?.showTestTimer))
        }
        this.interval = setInterval(() => this.tick(), 1000)
    }

    persistTimer() {
        localStorage.setItem('timer-state', JSON.stringify({
            ...this.state
        }))
    }


    render(): React.ReactNode {
        const testData = this.props.newTest
        const { state: { isTimeUp, second, minute, hour },
            props: { partcipant } } = this
        const _second = second < 10 ? `0${second}` : second
        const _minute = minute < 10 ? `0${minute}` : minute
        const _hour = hour < 10 ? `0${hour}` : hour

        if (!partcipant?._id || partcipant.taken && !isTimeUp) return

        return (
            <Container>
                <DurationCol>
                    <TimerText sx={{
                        fontSize: 13,
                        textAlign: 'center', color: isTimeUp ? colors.red[400] : ''
                    }}>
                        {isTimeUp ? 'Time Up' : 'Timer'}{isTimeUp ? '' : `: ${testData?.duration}`}
                    </TimerText>
                </DurationCol>
                <TimerContainer>
                    <TimerText sx={{ color: isTimeUp ? colors.red[400] : '' }}>
                        {_hour}:{_minute}:{_second}
                    </TimerText>
                </TimerContainer>
            </Container>
        )
    }

}

const mapStateToProps = (state: AppState) => {
    return {
        newTest: state.TestReducer.newTest,
        partcipant: state.TestReducer.partcipant,
        showTestTimer: state.TestReducer.showTestTimer,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer)



