// Saga 이펙트 (이펙트는 yield 키워드와 함께 사용한다.)
import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
} from '../reducers/post';

function addPostApi(data) {
	return axios.post('/api/post', data);
}

function addCommentApi(data) {
	return axios.post(`/api/post/${data.id}/comment`, data);
}

function* addPost(action) {
	try {
		// const result = yield call(addPostApi, action.data);
		yield delay(1000);
		yield put({
			type: ADD_POST_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: ADD_POST_FAILURE,
			error: e.response.data,
		});
	}
}

function* addComment(action) {
	try {
		// const result = yield call(addPostApi, action.data);
		yield delay(1000);
		yield put({
			type: ADD_COMMENT_SUCCESS,
		});
	} catch (e) {
		yield put({
			type: ADD_COMMENT_FAILURE,
			error: e.response.data,
		});
	}
}

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
	yield all([fork(watchAddPost), fork(watchAddComment)]);
}
