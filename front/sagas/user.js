// Saga 이펙트 (이펙트는 yield 키워드와 함께 사용한다.)
import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
} from '../reducers/user';

function loginApi(data) {
	// function loginApi(data, a, b) {
	return axios.post('/api/login', data);
}

function logoutApi() {
	return axios.post('/api/logout');
}

function registerApi() {
	return axios.post('/api/register');
}

function* login(action) {
	try {
		// 백엔드의 응답을 받을 때까지 기다려야 하므로 동기식으로 호출(call)한다.
		// 비동기식으로 호출할 경우, 응답을 받기 전에 다음 코드가 실행된다.
		// call(호출할 함수, 매개변수, 매개변수, ...)
		// const result = yield call(loginApi, action.data);
		// const result = yield call(loginApi, action.data, 'a', 'b');
		// 백엔드가 아직 없으므로 딜레이 효과와 더미 데이터를 사용한다.
		yield delay(1000);
		// put() 함수는 dispatch 역할을 수행한다. (액션 객체를 dispatch한다.)
		yield put({
			type: LOGIN_SUCCESS,
			// data: result.data, // 성공 결과
			data: action.data,
		});
	} catch (e) {
		yield put({
			type: LOGIN_FAILURE,
			error: e.response.data, // 실패 결과
		});
	}
}

function* logout() {
	try {
		// const result = yield call(logoutApi);
		yield delay(1000);
		yield put({
			type: LOGOUT_SUCCESS,
			// data: result.data,
		});
	} catch (e) {
		yield put({
			type: LOGOUT_FAILURE,
			error: e.response.data,
		});
	}
}

function* register() {
	try {
		// const result = yield call(registerApi);
		yield delay(1000);
		yield put({
			type: REGISTER_SUCCESS,
			// data: result.data,
		});
	} catch (e) {
		yield put({
			type: REGISTER_FAILURE,
			error: e.response.data,
		});
	}
}

function* watchLogin() {
	// take() 함수는 매개변수로 받은 액션이 실행될 때까지 기다린다. (1회용)
	// take() & 무한 반복문 대신 takeEvery() 함수로 여러 번 재사용 할 수 있다.
	// yield takeEvery('LOGIN_REQUEST', login);
	// 사용자의 실수로 클릭을 n번할 경우, n번 모두 요청을 보낸다.
	// 동시에 중복 요청을 보낸 경우, 하나의 서버 응답만 받도록 takeLatest() 함수를 사용한다.
	// (서버는 중복 요청을 모두 받은 상태이므로 동시의 중복된 요청은 처리하지 않도록 해야 한다.)
	// 액션이 실행되면 두 번째 매개변수로 받은 함수를 실행한다.
	yield takeLatest(LOGIN_REQUEST, login);
	// n초 이내에는 반드시 1번의 요청만 보내도록 제한하는 throttle() 함수도 있다.
	// yield throttle('LOGIN_REQUEST', login, 5000);
}

function* watchLogout() {
	yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchRegister() {
	yield takeLatest(REGISTER_REQUEST, register);
}

export default function* userSaga() {
	yield all([fork(watchLogin), fork(watchLogout), fork(watchRegister)]);
}
