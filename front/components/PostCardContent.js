import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

function PostCardContent({ postContent }) {
	return (
		<div>
			{/* https://regexr.com */}
			{/* /#/는 #을 선택한다. / ^는 제외한다. / \s는 공백을 의미한다. */}
			{/* g는 여러 개를 의미한다 */}
			{/* 소괄호는 split 함수로 인해 사용한다. */}
			{postContent.split(/(#[^\s#]+)/g).map((v, i) => {
				if (v.match(/(#[^\s#]+)/)) {
					// /hashtag/a의 형식이 되도록 슬라이스한다. (#을 제외한다.)
					return (
						<Link href={`/hashtag/${v.slice(1)}`} key={i}>
							<a>{v}</a>
						</Link>
					);
				}
				return v;
			})}
		</div>
	);
}

PostCardContent.propTypes = {
	postContent: PropTypes.string.isRequired,
};

export default PostCardContent;
