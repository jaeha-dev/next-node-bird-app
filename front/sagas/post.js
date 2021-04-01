// Saga 이펙트 (이펙트는 yield 키워드와 함께 사용한다.)
import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import shortId from 'shortid';
import {
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
	REMOVE_COMMENT_REQUEST,
	REMOVE_COMMENT_SUCCESS,
	REMOVE_COMMENT_FAILURE,
} from '../reducers/post';
import { ADD_POST_ME } from '../reducers/user';

function addPostApi(data) {
	return axios.post('/api/post', data);
}

function removePostApi(data) {
	return axios.delete('/api/post', data);
}

function addCommentApi(data) {
	return axios.post(`/api/post/${data.id}/comment`, data);
}

function removeCommentApi(data) {
	return axios.delete(`/api/post/${data.id}/comment`, data);
}

function* addPost(action) {
	try {
		// const result = yield call(addPostApi, action.data);
		yield delay(1000);
		const id = shortId.generate();
		// saga는 동시에 여러 개의 액션을 처리할 수 있다.
		yield put({
			type: ADD_POST_SUCCESS,
			data: {
				id,
				content: action.data,
			},
		});
		yield put({
			type: ADD_POST_ME,
			data: id,
		});
	} catch (e) {
		yield put({
			type: ADD_POST_FAILURE,
			error: e.response.data,
		});
	}
}

function* removePost(action) {
	try {
		yield delay(1000);
		yield put({
			type: REMOVE_POST_SUCCESS,
			data: action.data,
		});
	} catch (e) {
		yield put({
			type: REMOVE_POST_FAILURE,
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
			data: action.data,
		});
	} catch (e) {
		yield put({
			type: ADD_COMMENT_FAILURE,
			error: e.response.data,
		});
	}
}

function* removeComment(action) {
	try {
		yield delay(1000);
		yield put({
			type: REMOVE_COMMENT_SUCCESS,
			data: action.data,
		});
	} catch (e) {
		yield put({
			type: REMOVE_COMMENT_FAILURE,
			error: e.response.data,
		});
	}
}

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
	yield takeLatest(REMOVE_POST_REQUEST, remoePost);
}

function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchRemoveComment() {
	yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}

export default function* postSaga() {
	yield all([
		fork(watchAddPost),
		fork(watchRemovePost),
		fork(watchAddComment),
		fork(watchRemoveComment),
	]);
}
