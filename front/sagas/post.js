// Saga 이펙트 (이펙트는 yield 키워드와 함께 사용한다.)
import { all, fork, put, throttle, takeLatest, delay } from 'redux-saga/effects';
// import axios from 'axios';
import shortId from 'shortid';
import {
	LOAD_POSTS_REQUEST,
	LOAD_POSTS_SUCCESS,
	LOAD_POSTS_FAILURE,
	generateDummyPost,
	ADD_POST_REQUEST,
	ADD_POST_SUCCESS,
	ADD_POST_FAILURE,
	REMOVE_POST_REQUEST,
	REMOVE_POST_SUCCESS,
	REMOVE_POST_FAILURE,
	ADD_COMMENT_REQUEST,
	ADD_COMMENT_SUCCESS,
	ADD_COMMENT_FAILURE,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';

// function loadPostsAPI(data) {
//   return axios.get('/api/posts', data);
// }

// function addPostApi(data) {
//   return axios.post('/api/post', data);
// }

// function removePostApi(data) {
//   return axios.delete('/api/post', data);
// }

// function addCommentApi(data) {
//   return axios.post(`/api/post/${data.id}/comment`, data);
// }

function* loadPosts(action) {
	try {
		// const result = yield call(loadPostsAPI, action.data);
		yield delay(1000);
		yield put({
			type: LOAD_POSTS_SUCCESS,
			data: generateDummyPost(10),
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: LOAD_POSTS_FAILURE,
			data: err.response.data,
		});
	}
}

function* addPost(action) {
	try {
		// const result = yield call(addPostAPI, action.data);
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
			type: ADD_POST_TO_ME,
			data: id,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: ADD_POST_FAILURE,
			data: err.response.data,
		});
	}
}

function* removePost(action) {
	try {
		// const result = yield call(removePostAPI, action.data);
		yield delay(1000);
		yield put({
			type: REMOVE_POST_SUCCESS,
			data: action.data,
		});
		yield put({
			type: REMOVE_POST_OF_ME,
			data: action.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: REMOVE_POST_FAILURE,
			data: err.response.data,
		});
	}
}

function* addComment(action) {
	try {
		// const result = yield call(addCommentAPI, action.data);
		yield delay(1000);
		yield put({
			type: ADD_COMMENT_SUCCESS,
			data: action.data,
		});
	} catch (err) {
		yield put({
			type: ADD_COMMENT_FAILURE,
			data: err.response.data,
		});
	}
}

function* watchLoadPosts() {
	yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
	yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
	yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
	yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
	yield all([
		fork(watchLoadPosts),
		fork(watchAddPost),
		fork(watchRemovePost),
		fork(watchAddComment),
	]);
}
