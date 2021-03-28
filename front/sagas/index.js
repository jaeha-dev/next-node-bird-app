// Saga 이펙트 (이펙트는 yield 키워드와 함께 사용한다.)
import { all, fork } from 'redux-saga/effects';
import userSaga from './user';
import postSaga from './post';

// 제너레이터 함수
export default function* rootSaga() {
	// all() 함수는 배열을 받고 배열의 모든 요소를 실행한다.
	// fork() 함수는 매개변수로 받은 함수를 실행한다. (비동기식 호출)
	// call() 함수는 매개변수로 받은 함수를 실행한다. (동기식 호출)
	yield all([fork(userSaga), fork(postSaga)]);
}
