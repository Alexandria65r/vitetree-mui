import { createAsyncThunk } from "@reduxjs/toolkit";
import { Descendant } from "slate";
import { AppState } from "../../store/store";
import Randomstring from "randomstring";
import AcademicAnswersAPI from "../../src/api-services/academic-answers";
import { AcademicAnswer } from "../../src/models/academic-answer";
import { academicAnswersActions } from ".";

export const createAcademicAnswerThunk = createAsyncThunk<void, Descendant[], { state: AppState }>
    ('acaAcademicAnswerSlice/createAcademicAnswerThunk', async (editorData, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        const state = thunkAPI.getState()
        const user = state.AuthReducer.user
        const post = state.ForumReducer.post
        const answers = state.AcademicReducer.answers
        const ansId = Randomstring.generate(17)

        const answer: AcademicAnswer = {
            _id: ansId,
            postId: post._id,
            postAuthorId: post.authorId?? '',
            author: {
                id: user._id ?? '',
                userName: `${user.firstName} ${user.lastName}`
            },
            upVote:[],
            downVote:[],
            data: editorData,
            createdAt: new Date().toISOString()
        }

        dispatch(academicAnswersActions.setAnswers([answer, ...answers]))
        try {
            const newAcademicAnswer = await AcademicAnswersAPI.create(answer)
        } catch (error) {

        }
        console.log(answer)
    })




export const fetchAcademicAnswersThunk = createAsyncThunk<void, string, { state: AppState }>
    ('acaAcademicAnswerSlice/fetchAcademicAnswersThunk', async (ansId, thunkAPI) => {
        const dispatch = thunkAPI.dispatch
        try {
            dispatch(academicAnswersActions.setAcademicAnswerNetworkStatus('fetch-academic-answers'))
            const acaAcademicAnswers = await AcademicAnswersAPI.fetchAcademicAnswers(ansId)
            if (acaAcademicAnswers) {
                dispatch(academicAnswersActions.setAcademicAnswerNetworkStatus('fetch-academic-answers-success'))
                dispatch(academicAnswersActions.setAnswers(acaAcademicAnswers))
            }
        } catch (error) {
            dispatch(academicAnswersActions.setAcademicAnswerNetworkStatus('fetch-academic-answers-error'))
        }
    })