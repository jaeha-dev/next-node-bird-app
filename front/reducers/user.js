import produce from '../utils/produce';

export const initialState = {
	loginLoading: false, // 로그인 시도 중
	loginDone: false,
	loginError: null,
	logoutLoading: false, // 로그아웃 시도 중
	logoutDone: false,
	logoutError: null,
	registerLoading: false, // 계정 등록 시도 중
	registerDone: false,
	registerError: null,
	changeNicknameLoading: false, // 닉네임 수정 시도 중
	changeNicknameDone: false,
	changeNicknameError: null,
	me: null,
	registerData: {},
	loginData: {},
};

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';
export const ADD_POST_ME = 'ADD_POST_ME';
export const REMOVE_POST_ME = 'REMOVE_POST_ME';

const dummyUser = (data) => ({
	...data,
	nickname: 'test',
	id: 1,
	Posts: [{ id: 1 }],
	Followings: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
	Followers: [{ nickname: '부기초' }, { nickname: 'Chanho Lee' }, { nickname: 'neue zeal' }],
});

// 동적 액션 생성 함수
export const loginRequestAction = (data) => ({
	type: LOGIN_REQUEST,
	data,
});

export const logoutRequestAction = () => ({
	type: LOGOUT_REQUEST,
});

export const registerRequestAction = (data) => ({
	type: REGISTER_REQUEST,
	data,
});

const reducer = (state = initialState, action) =>
	produce(state, (draft) => {
		switch (action.type) {
			case LOGIN_REQUEST:
				draft.loginLoading = true;
				draft.loginDone = false;
				draft.loginError = null; // 이전에 로그인 실패한 경우, 에러를 초기화한다.
				break;
			case LOGIN_SUCCESS:
				draft.loginLoading = false;
				draft.loginDone = true;
				draft.me = dummyUser(action.data);
				break;
			case LOGIN_FAILURE:
				draft.loginLoading = false;
				draft.loginError = action.error;
				break;
			case LOGOUT_REQUEST:
				draft.logoutLoading = true;
				draft.logoutDone = false;
				draft.logoutError = null;
				break;
			case LOGOUT_SUCCESS:
				draft.logoutLoading = false;
				draft.logoutDone = true;
				draft.me = null;
				break;
			case LOGOUT_FAILURE:
				draft.logoutLoading = false;
				draft.logoutError = action.error;
				break;
			case REGISTER_REQUEST:
				draft.registerLoading = true;
				draft.registerDone = false;
				draft.registerError = null;
				break;
			case REGISTER_SUCCESS:
				draft.registerLoading = false;
				draft.registerDone = true;
				break;
			case REGISTER_FAILURE:
				draft.registerLoading = false;
				draft.registerError = action.error;
				break;
			case CHANGE_NICKNAME_REQUEST:
				draft.changeNicknameLoading = true;
				draft.changeNicknameError = null;
				draft.changeNicknameDone = false;
				break;
			case CHANGE_NICKNAME_SUCCESS:
				draft.changeNicknameLoading = false;
				draft.changeNicknameDone = true;
				break;
			case CHANGE_NICKNAME_FAILURE:
				draft.changeNicknameLoading = false;
				draft.changeNicknameError = action.error;
				break;
			case ADD_POST_ME:
				draft.me.Posts.unshift({ id: action.data });
				break;
			// return {
			//   ...state,
			//   me: {
			//     ...state.me,
			//     Posts: [{ id: action.data }, ...state.me.Posts],
			//   },
			// };
			case REMOVE_POST_ME:
				draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
				break;
			// return {
			//   ...state,
			//   me: {
			//     ...state.me,
			//     Posts: state.me.Posts.filter((v) => v.id !== action.data),
			//   },
			// };
			default:
				break;
		}
	});

export default reducer;
