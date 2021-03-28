export const initialState = {
	mainPosts: [
		{
			id: 1,
			User: {
				id: 1,
				nickname: 'user1',
			},
			content: '첫 번째 게시글 #해시태그 #익스프레스',
			Images: [
				{
					src:
						'https://media.vlpt.us/images/fstone/post/9f5c4502-8820-48dd-8e66-8cd402530e35/redux-logo-landscape.png',
				},
				{
					src:
						'https://media.vlpt.us/images/fstone/post/9f5c4502-8820-48dd-8e66-8cd402530e35/redux-logo-landscape.png',
				},
				{
					src:
						'https://media.vlpt.us/images/fstone/post/9f5c4502-8820-48dd-8e66-8cd402530e35/redux-logo-landscape.png',
				},
			],
			Comments: [
				{
					User: {
						nickname: 'user2',
					},
					content: '댓글1',
				},
				{
					User: {
						nickname: 'user3',
					},
					content: '댓글2',
				},
			],
		},
	],
	// 이미지 업로드 시, 이미지 경로를 저장할 배열
	imagePaths: [],
	addPostLoading: false, // 게시글 등록 시도 중
	addPostDone: false,
	addPostError: null,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const dummyPost = {
	id: 2,
	content: '더미 게시글',
	User: {
		id: 1,
		nickname: 'user1',
	},
	Images: [],
	Comments: [],
};

export const addPostRequestAction = (data) => ({
	type: ADD_POST_REQUEST,
	data,
});

export const addCommentRequestAction = (data) => ({
	type: ADD_COMMENT_REQUEST,
	data,
});

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST_REQUEST:
			return {
				...state,
				addPostLoading: true,
				addPostDone: false,
				addPostError: null,
			};
		case ADD_POST_SUCCESS:
			return {
				...state,
				// 새롭게 등록한 게시글이 위로 가도록 한다.
				mainPosts: [dummyPost, ...state.mainPosts],
				addPostLoading: false,
				addPostDone: true,
			};
		case ADD_POST_FAILURE:
			return {
				...state,
				addPostLoading: false,
				addPostError: action.error,
			};
		case ADD_COMMENT_REQUEST:
			return {
				...state,
				addCommentLoading: true,
				addCommentDone: false,
				addCommentError: null,
			};
		case ADD_COMMENT_SUCCESS:
			return {
				...state,
				addCommentLoading: false,
				addCommentDone: true,
			};
		case ADD_COMMENT_FAILURE:
			return {
				...state,
				addCommentLoading: false,
				addCommentError: action.error,
			};
		default:
			return state;
	}
};

export default reducer;
