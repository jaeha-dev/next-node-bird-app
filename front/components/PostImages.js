import React from 'react';
import PropTypes from 'prop-types';

function PostImages({ images }) {
	return (
		<div>
			<p>구현 중...</p>
		</div>
	);
}

PostImages.propTypes = {
	images: PropTypes.arrayOf(PropTypes.object),
};

export default PostImages;
