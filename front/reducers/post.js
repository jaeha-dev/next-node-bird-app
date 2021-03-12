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
	// 게시글 등록 완료 여부
	postAdded: false,
};

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

const ADD_POST = 'ADD_POST';
export const addPostAction = {
	type: ADD_POST,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			return {
				...state,
				// 새롭게 등록한 게시글이 위로 가도록 한다.
				mainPosts: [dummyPost, ...state.mainPosts],
				postAdded: true,
			};
		default:
			return state;
	}
};

export default reducer;
